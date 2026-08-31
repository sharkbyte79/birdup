package org.birdup.api.model.dto.follow;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record CreateFollowRequest(
        @NotBlank @Pattern(
                regexp = "^[A-Za-z]{2}(-[A-Za-z0-9]{1,4}){0,2}$"
        ) String regionCode
) {}