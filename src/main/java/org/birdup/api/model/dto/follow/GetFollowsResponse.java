package org.birdup.api.model.dto.follow;

import java.time.LocalDateTime;

public record GetFollowsResponse(String regionCode, LocalDateTime createdAt) {}
