package com.dezkser.DTOs;

import dev.hilla.Nonnull;
import jakarta.validation.constraints.*;

import java.util.List;

public record User(
        String id,
        @Nonnull
        @NotBlank
        String username,
        @Email
        @NotBlank
        String email,
        @Nonnull
        @NotBlank
        String fullName,
        @Nonnull
        @NotBlank
        @Size(min = 10, max = 10)
        String phoneNumber,
        @Nonnull
        String profile,
        List<Country> countries,
        @Nonnull
        Boolean internal
) {
}
