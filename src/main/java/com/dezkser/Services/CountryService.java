package com.dezkser.Services;

import com.dezkser.DTOs.Country;
import com.dezkser.Repositories.CountriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    private final CountriesRepository mCountryRepository;

    public CountryService(CountriesRepository pCountryRepository) {
        this.mCountryRepository = pCountryRepository;
    }

    public List<Country> getAllCountries(){
        return mCountryRepository.findAll()
                .stream()
                .map(country->new Country(
                        country.getId(),
                        country.getName(),
                        country.getAcronym()
                ))
                .toList();
    }
}
