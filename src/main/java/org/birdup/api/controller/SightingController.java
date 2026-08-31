package org.birdup.api.controller;

import java.util.List;
import java.util.Map;

import io.swagger.v3.oas.annotations.Operation;
import org.birdup.api.model.entity.Sighting;
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
  public ResponseEntity<List<Sighting>> getSightingsByRegion(@PathVariable String regionCode) {
    return ResponseEntity.ok(this.sightingService.getSightingsByRegion(regionCode, false));
  }

  @GetMapping("/{regionCode}/notable")
  public ResponseEntity<List<Sighting>> getNotableSightingsByRegion(
      @PathVariable String regionCode) {
    return ResponseEntity.ok(this.sightingService.getSightingsByRegion(regionCode, true));
  }

  @GetMapping
  public ResponseEntity<List<Sighting>> getSightingsByCoordinates(
      @RequestParam(name = "lat") double latitude, @RequestParam(name = "lng") double longitude) {
    return ResponseEntity.ok(
        this.sightingService.getSightingsByCoordinates(latitude, longitude, false));
  }

  @GetMapping("/notable")
  public ResponseEntity<List<Sighting>> getNotableSightingsByCoordinates(
      @RequestParam(name = "lat") double latitude, @RequestParam(name = "lng") double longitude) {
    return ResponseEntity.ok(
        this.sightingService.getSightingsByCoordinates(latitude, longitude, true));
  }

  @GetMapping("/following/{userId}")
  public ResponseEntity<Map<String, List<Sighting>>> getFollowedRegionSightings(
      @PathVariable String userId) {
    return ResponseEntity.ok(this.sightingService.getFollowedSightingsForUser(userId, false));
  }

  @GetMapping("/following/{userId}/notable")
  public ResponseEntity<Map<String, List<Sighting>>> getFollowedRegionNotableSightings(
      @PathVariable String userId) {
    return ResponseEntity.ok(this.sightingService.getFollowedSightingsForUser(userId, true));
  }
}