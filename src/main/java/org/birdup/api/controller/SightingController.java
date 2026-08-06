package org.birdup.api.controller;

import org.birdup.api.entity.BirdSighting;
import org.birdup.api.service.SightingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("api/v1/sightings")
public class SightingController {

    private final SightingService sightingService;

    public SightingController(SightingService sightingService) {
        this.sightingService = sightingService;
    }

    @GetMapping("/{regionCode}")
    public ResponseEntity<List<BirdSighting>> getSightingsByRegion(@PathVariable String regionCode) {
        var birdSightings = sightingService.getSightingsByRegion(regionCode, false);
        return ResponseEntity.ok(birdSightings);
    }

    @GetMapping("/{regionCode}/notable")
    public ResponseEntity<List<BirdSighting>> getNotableSightingsByRegion(@PathVariable String regionCode) {
        var birdSightings = sightingService.getSightingsByRegion(regionCode, true);
        return ResponseEntity.ok(birdSightings);
    }
}
