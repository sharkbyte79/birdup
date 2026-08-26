package org.birdup.api.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.birdup.api.model.entity.BirdSighting;
import org.birdup.api.model.entity.Follow;
import org.birdup.api.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class SightingService {

  private final RestClient restClient;

  private final FollowRepository followRepository;

  private final String baseUrl = "https://api.ebird.org/v2";

  public SightingService(
      RestClient.Builder restClient,
      @Value("${ebird.api.key}") String apiKey,
      FollowRepository followRepository) {
    this.followRepository = followRepository;
    this.restClient = restClient.baseUrl(baseUrl).defaultHeader("X-eBirdApiToken", apiKey).build();
  }

  /**
   * Fetches and returns a bundle of recent bird observation data from eBird.
   *
   * @param regionCode specifies the geographical region to request sightings from.
   * @param notable only return sightings marked as notable.
   * @return the list of data on bird sightings per the specified regionCode, empty if null.
   */
  @Cacheable(value = "sightings", key = "#regionCode + #notable")
  public List<BirdSighting> getSightingsByRegion(final String regionCode, final boolean notable) {

    var birdSightings =
        restClient
            .get()
            .uri(
                uriBuilder ->
                    uriBuilder
                        .path("/data/obs/{regionCode}/recent")
                        .queryParam("back", 30)
                        .queryParam("maxResults", 50)
                        .fragment(notable ? "/notable" : null)
                        .build(regionCode))
            .retrieve()
            .body(BirdSighting[].class);

    return birdSightings != null ? Arrays.stream(birdSightings).toList() : Collections.emptyList();
  }

  public List<BirdSighting> getSightingsByCoordinates(
      final double latitude, final double longitude, final boolean notable) {

    var sightings =
        restClient
            .get()
            .uri(
                uriBuilder ->
                    uriBuilder
                        .path("/data/obs/geo/recent")
                        .queryParam("lat", latitude)
                        .queryParam("lng", longitude)
                        .fragment(notable ? "/notable" : null)
                        .build())
            .retrieve()
            .body(BirdSighting[].class);

    return sightings != null ? Arrays.stream(sightings).toList() : Collections.emptyList();
  }

  /// Returns a mapping of region codes to sightings, for those region codes followed by the user
  /// indicated by userId.
  ///
  /// @param userId unique ID referring to a user.
  /// @param notable only return sightings marked as notable.
  /// @return map of region codes to sighting lists.
  public Map<String, List<BirdSighting>> getFollowedSightingsForUser(
      final String userId, final boolean notable) {

    return followRepository.findFollowsByUserIdOrderByRegionCodeAsc(userId).stream()
        .map(Follow::getRegionCode)
        .collect(
            Collectors.toMap(
                regionCode -> regionCode,
                regionCode -> this.getSightingsByRegion(regionCode, false)));
  }
}
