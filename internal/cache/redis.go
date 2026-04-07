package cache

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/sharkbyte79/birdup/internal/config"
)

func NewRedis(cfg config.RedisConfig) (*redis.Client, error) {
	// db, err := strconv.Atoi(cfg.DB)
	// if err != nil {
	// 	return nil, fmt.Errorf("Error getting Redis db: %w", err)
	// }
	fmt.Println(cfg.Address)
	rdb := redis.NewClient(&redis.Options{
		Addr:     cfg.Address,
		Password: "",
		DB:       cfg.DB,
		Protocol: 2,
	})
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if _, err := rdb.Ping(ctx).Result(); err != nil {
		return nil, fmt.Errorf("Failed to ping Redis store: %w", err)
	}

	return rdb, nil
}
