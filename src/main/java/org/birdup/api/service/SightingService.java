package org.birdup.api.service;

import org.birdup.api.model.BirdSighting;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class SightingService {

    private final RestClient restClient;

    public SightingService(RestClient.Builder restClient, @Value("${ebird.api.key}") String apiKey)  {
        String baseUrl = "https://api.ebird.org/v2";
        this.restClient = restClient
                .baseUrl(baseUrl)
                .defaultHeader("X-eBirdApiToken", apiKey)
                .build();
    }

    /**
     * Fetches and returns a bundle of recent bird observation data from eBird.
     * @param regionCode specifies the geographical region to request sightings from.
     * @param notable only return sightings marked as notable.
     * @return the list of data on bird sightings per the specified regionCode, empty if null.
     */
    public List<BirdSighting> getSightingsByRegion(final String regionCode, boolean notable) {

        var birdSightings = restClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path("/data/obs/{regionCode}/recent" + (notable ? "/notable" : ""))
                                .queryParam("back", 30)
                                .queryParam("maxResults", 50)
                                .build(regionCode)
                )
                .retrieve()
                .body(BirdSighting[].class);

        return birdSightings != null ? Arrays.stream(birdSightings).toList() : Collections.emptyList();
    }

    public static boolean isValidRegionCode(String regionCode) {
        return false;
    }
}