package com.dezkser.DTOs;

import dev.hilla.Nonnull;

public record Profile(
        @Nonnull
        String name,
        @Nonnull
        Integer maxCountries
) {
}
