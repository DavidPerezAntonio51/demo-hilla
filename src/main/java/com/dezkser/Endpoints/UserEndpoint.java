package com.dezkser.Endpoints;

import dev.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import com.dezkser.DTOs.User;
import com.dezkser.Services.UserManagerService;

@BrowserCallable
public class UserEndpoint {
    private final UserManagerService mUserManagerService;

    public UserEndpoint(UserManagerService pUserManagerService) {
        this.mUserManagerService = pUserManagerService;
    }

    @RolesAllowed({"ROLE_ADMINISTRADOR"})
    public String createNewUser(User pUser){
        return mUserManagerService.createNewUserAndGetTemporalPassword(pUser);
    }
}
