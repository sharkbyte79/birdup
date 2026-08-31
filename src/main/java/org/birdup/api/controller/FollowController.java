package org.birdup.api.controller;


import jakarta.validation.Valid;
import org.birdup.api.model.entity.Follow;
import org.birdup.api.model.dto.follow.CreateFollowRequest;
import org.birdup.api.model.dto.follow.GetFollowsResponse;
import org.birdup.api.repository.FollowRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


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

        try {
            this.followRepository.save(new Follow(jwt.getSubject(), requestDto.regionCode()));
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/remove/{regionCode}")
    public ResponseEntity<?> deleteFollow(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String regionCode
    ) {
        this.followRepository.deleteFollowByUserIdAndRegionCode(jwt.getSubject(), regionCode);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping()
    public ResponseEntity<List<GetFollowsResponse>> getFollowsByUser(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(
                followRepository.findFollowsByUserIdOrderByRegionCodeAsc(jwt.getSubject())
                        .stream()
                        .map(follow -> new GetFollowsResponse(follow.getRegionCode(), follow.getCreatedAt()))
                        .collect(Collectors.toList()));
    }
}
