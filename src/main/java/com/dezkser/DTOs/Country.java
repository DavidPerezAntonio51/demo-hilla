package com.dezkser.DTOs;

import dev.hilla.Nonnull;

public record Country(
        @Nonnull
        String id,
        @Nonnull
        String name,
        @Nonnull
        String acronym
) {
}
