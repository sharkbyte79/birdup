package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"time"

	"github.com/redis/go-redis/v9"
	ac "github.com/sharkbyte79/birdup/internal/client"
)

// Time in minutes to retain cached eBird API responses.
const cacheExpiration = 30 * time.Minute

type BirdService interface {
	RecentObsByRegion(rc string, back, max int) ([]ac.BirdObservation, error)
	// NotableObsByRegion(rc string, back, max int) ([]ac.BirdObservation, error)
}

// EBirdService exposes methods implementing a BirdService using an underlying
// EBirdClient implementation.
type EBirdService struct {
	client ac.EBirdClient
}

// CachedEBirdService exposes methods implementing a BirdService using an underlying
// BirdService implementation and Redis cache client.
type CachedEBirdService struct {
	service BirdService
	cache   *redis.Client
}

// validRegionCode returns true if rc matches the format of a value
// region code as accepted by the eBird API, and false otherwise.
func validRegionCode(rc string) bool {
	pattern := "^[A-Za-z]{2}(-[0-9][0-9])?"
	ok, err := regexp.Match(pattern, []byte(rc))
	if err != nil {
		// assume false or some malformity for error
		return false
	}
	return ok
}

// NewEBirdService returns a pointer to an EBirdService.
func NewEBirdService(tok string, hc *http.Client) (*EBirdService, error) {
	ebc, err := ac.NewClient(tok, hc)
	if err != nil {
		return nil, fmt.Errorf("failed to create eBird service instance: %w", err)
	}
	return &EBirdService{client: ebc}, nil
}

// NotableObsByRegion returns a slice of BirdObservations and an error.
func (s *EBirdService) RecentObsByRegion(rc string, back, max int) ([]ac.BirdObservation, error) {
	// Reject region code that doesn't match expected format
	if !validRegionCode(rc) {
		return nil, fmt.Errorf("invalid region code: %s", rc)
	}

	params := ac.RegionSearchParams{RegionCode: rc, Back: back, MaxResults: max, Notable: false}
	return s.client.ObsByRegion(params)
}

// NotableObsByRegion returns a slice of BirdObservations marked as notable and an error.
func (s *EBirdService) NotableObsByRegion(rc string, back, max int) ([]ac.BirdObservation, error) {
	// Reject region code that doesn't match expected format
	if !validRegionCode(rc) {
		return nil, fmt.Errorf("invalid region code: %s", rc)
	}

	params := ac.RegionSearchParams{RegionCode: rc, Back: back, MaxResults: max, Notable: true}
	return s.client.ObsByRegion(params)
}

// NewCachedEBirdService returns a pointer to a CachedEBirdService with the
// underlying BirdService implementation s and Redis client r.
func NewCachedEBirdService(s BirdService, r *redis.Client) *CachedEBirdService {
	return &CachedEBirdService{
		service: s,
		cache:   r,
	}
}

// RecentObsByRegion returns a cached bundle of bird observations for the specified region rc,
// or defers to the underlying service and caches that response.
func (s *CachedEBirdService) RecentObsByRegion(rc string, back, max int) ([]ac.BirdObservation, error) {
	// Redis key for this query
	key := fmt.Sprintf("region:%s", rc)

	// Attempt to pull cached response for region code
	b, err := s.cache.Get(context.TODO(), key).Bytes()
	if err == nil {
		var obs []ac.BirdObservation
		if jsonErr := json.Unmarshal(b, &obs); jsonErr == nil {
			fmt.Printf("got cached results for region code: %s\n", rc)
			return obs, nil
		}
		fmt.Printf("cache miss for region code: %s\n", rc)
	}

	// Defer to regular service call for cache miss/marshaling error
	obs, err := s.service.RecentObsByRegion(rc, back, max)
	if err == nil {
		// Cache API results
		if b, jsonErr := json.Marshal(obs); jsonErr == nil {
			s.cache.Set(context.TODO(), key, b, cacheExpiration)
			fmt.Printf("cached results for region code: %s\n", rc)

		}
	}
	return obs, err
}
