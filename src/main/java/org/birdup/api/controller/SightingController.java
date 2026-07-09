package org.birdup.api.controller;

import org.birdup.api.model.BirdSighting;
import org.birdup.api.service.SightingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/sighting")
public class SightingController {

    private final SightingService sightingService;

    public SightingController(SightingService sightingService) {
        this.sightingService = sightingService;
    }

    @GetMapping("/{regionCode}")
    public List<BirdSighting> getSightingsByRegion(@PathVariable String regionCode) {
        return sightingService.getSightingsByRegion(regionCode, false);
    }

    @GetMapping("/{regionCode}/notable")
    public List<BirdSighting> getNotableSightingsByRegion(@PathVariable String regionCode) {
        return sightingService.getSightingsByRegion(regionCode, true);
    }
}
