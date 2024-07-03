package com.dezkser.Services;

import com.dezkser.DTOs.Profile;
import com.dezkser.Repositories.ProfilesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {
    private final ProfilesRepository mProfilesRepository;

    public ProfileService(ProfilesRepository pProfilesRepository) {
        this.mProfilesRepository = pProfilesRepository;
    }

    public List<Profile> getAllAvailableProfiles() {
        return mProfilesRepository.findAllByShouldShowIsTrue()
                .stream()
                .map(profileDocument -> new Profile(
                                profileDocument.getName(),
                                profileDocument.getMaxCountries()
                        )
                )
                .toList();
    }
}
