package org.birdup.api.entity.dto.user;

import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
       @NotBlank String displayName
) {}