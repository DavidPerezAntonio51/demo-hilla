package com.dezkser.Endpoints;

import com.dezkser.DocumentsDB.UserDocument;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import jakarta.annotation.security.PermitAll;
import com.dezkser.DTOs.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@BrowserCallable
public class UserInfoEndpoint {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserInfo.class);

    @PermitAll
    @Nonnull
    public UserInfo getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();

        final List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .map(rol->rol.replace("ROLE_",""))
                .collect(Collectors.toList());
        UserDocument currentUser = (UserDocument) auth.getPrincipal();
        if(LOGGER.isTraceEnabled()){
            LOGGER.trace("Getting current user from auth: {}", currentUser);
        }
        return new UserInfo(
                currentUser.getUsername(),
                currentUser.getEmail(),
                currentUser.getFullName(),
                currentUser.getPhoneNumber(),
                currentUser.getLastPasswordChange(),
                authorities
        );
    }

}
