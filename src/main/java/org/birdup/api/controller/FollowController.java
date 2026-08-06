package org.birdup.api.controller;


import jakarta.validation.Valid;
import org.birdup.api.entity.Follow;
import org.birdup.api.entity.dto.follow.CreateFollowRequest;
import org.birdup.api.repository.FollowRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@Validated
@RestController()
@RequestMapping(value = "api/v1/follows")
public class FollowController {

    private final FollowRepository followRepository;

    public FollowController(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createFollow(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody CreateFollowRequest requestDto) {

        var userId = jwt.getSubject();
        var regionCode = requestDto.regionCode();

        System.out.println(userId);
        System.out.println(regionCode);

        try {
            this.followRepository.save(new Follow(userId, regionCode));
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /*@GetMapping()
    public ResponseEntity<List<Follow>> getFollowsByUser(
            Pageable page
    ) {
    }*/
}
