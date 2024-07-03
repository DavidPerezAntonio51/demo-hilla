package com.dezkser.Endpoints;

import dev.hilla.BrowserCallable;
import jakarta.annotation.security.RolesAllowed;
import com.dezkser.DTOs.Profile;
import com.dezkser.Services.ProfileService;

import java.util.List;

@BrowserCallable
public class ProfileEndpoint {
    private final ProfileService mProfileService;

    public ProfileEndpoint(ProfileService pProfileService) {
        this.mProfileService = pProfileService;
    }

    @RolesAllowed({"ROLE_ADMINISTRADOR"})
    public List<Profile> getProfiles(){
        return mProfileService.getAllAvailableProfiles();
    }
}
