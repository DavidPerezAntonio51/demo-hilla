package com.dezkser.DTOs;

import dev.hilla.Nonnull;

import java.time.Instant;
import java.util.Collection;

/**
 * This class is used as a container to enable the client side security
 * and allow client side protected routes
 */
public record UserInfo (

    @Nonnull
    String username,
    String email,
    String fullName,
    String phoneNumber,
    //Pendiente por definir si es requerido o no
    //List<Country> countries = new LinkedList<>(),
    Instant lastPasswordChange,
    @Nonnull
    Collection<@Nonnull String> authorities
)
{}
