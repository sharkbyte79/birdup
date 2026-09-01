package org.birdup.api.service;

import org.birdup.api.model.entity.Sighting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("SightingService Unit Tests")
class SightingServiceTest {

  @InjectMocks private SightingService sightingService;

  @Nested
  @DisplayName("eBird Sightings Fetch Tests")
  class getSightingsByRegionTests {

    @Test
    @DisplayName("Should fetch and bind list of bird sightings successfully")
    void getSightingsByRegion_success() {
      final String regionCode = "US-MA";

      final List<Sighting> result = sightingService.getSightingsByRegion(regionCode, false);

      assertNotNull(result);
    }
  }
}
