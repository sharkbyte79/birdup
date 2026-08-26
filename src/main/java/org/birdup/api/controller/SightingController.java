package org.birdup.api.controller;

import java.util.List;
import java.util.Map;
import org.birdup.api.model.entity.BirdSighting;
import org.birdup.api.service.SightingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sightings")
public class SightingController {

  private static final Logger logger = LoggerFactory.getLogger(SightingController.class);
  private final SightingService sightingService;

  public SightingController(SightingService sightingService) {
    this.sightingService = sightingService;
  }

  @GetMapping("/{regionCode}")
  public ResponseEntity<List<BirdSighting>> getSightingsByRegion(@PathVariable String regionCode) {
    return ResponseEntity.ok(sightingService.getSightingsByRegion(regionCode, false));
  }

  @GetMapping("/{regionCode}/notable")
  public ResponseEntity<List<BirdSighting>> getNotableSightingsByRegion(
      @PathVariable String regionCode) {
    return ResponseEntity.ok(sightingService.getSightingsByRegion(regionCode, true));
  }

  @GetMapping
  public ResponseEntity<List<BirdSighting>> getSightingsByCoordinates(
      @RequestParam(name = "lat") double latitude, @RequestParam(name = "lng") double longitude) {
    return ResponseEntity.ok(
        this.sightingService.getSightingsByCoordinates(latitude, longitude, false));
  }

  @GetMapping("/notable")
  public ResponseEntity<List<BirdSighting>> getNotableSightingsByCoordinates(
      @RequestParam(name = "lat") double latitude, @RequestParam(name = "lng") double longitude) {
    return ResponseEntity.ok(
        this.sightingService.getSightingsByCoordinates(latitude, longitude, true));
  }

  @GetMapping("/following/{userId}")
  public ResponseEntity<Map<String, List<BirdSighting>>> getFollowedRegionSightings(
      @PathVariable String userId) {
    return ResponseEntity.ok(sightingService.getFollowedSightingsForUser(userId, false));
  }

  @GetMapping("/following/{userId}/notable")
  public ResponseEntity<Map<String, List<BirdSighting>>> getFollowedRegionNotableSightings(
      @PathVariable String userId) {
    return ResponseEntity.ok(sightingService.getFollowedSightingsForUser(userId, true));
  }
}
