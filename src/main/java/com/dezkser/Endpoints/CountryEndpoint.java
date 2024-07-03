package com.dezkser.Endpoints;

import com.dezkser.Services.CountryService;
import dev.hilla.BrowserCallable;
import jakarta.annotation.security.PermitAll;
import com.dezkser.DTOs.Country;

import java.util.List;

@BrowserCallable
public class CountryEndpoint {
    private final CountryService mCountryService;

    public CountryEndpoint(CountryService pCountryService) {
        this.mCountryService = pCountryService;
    }

    @PermitAll
    public List<Country> getAllCountries(){
        return mCountryService.getAllCountries();
    }
}
