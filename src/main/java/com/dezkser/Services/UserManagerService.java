package com.dezkser.Services;

import com.dezkser.DocumentsDB.Constants.Status;
import com.dezkser.DocumentsDB.CountryDocument;
import com.dezkser.DocumentsDB.UserDocument;
import com.dezkser.DTOs.Country;
import com.dezkser.DTOs.User;
import com.dezkser.Repositories.UsersRepository;
import com.dezkser.Utils.PasswordGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagerService {
    private final UsersRepository mUsersRepository;
    private final PasswordGenerator mPasswordGenerator;
    private final PasswordEncoder mPasswordEncoder;

    public UserManagerService(UsersRepository pUsersRepository, PasswordGenerator pPasswordGenerator,
                              PasswordEncoder pPasswordEncoder
    ) {
        this.mUsersRepository = pUsersRepository;
        this.mPasswordGenerator = pPasswordGenerator;
        this.mPasswordEncoder = pPasswordEncoder;
    }

    public String createNewUserAndGetTemporalPassword(User pNewUser) {
        String newSecurePassword = mPasswordGenerator.generateSecurePassword(pNewUser.username());
        UserDocument userDocument = new UserDocument();
        userDocument.setUsername(pNewUser.username());
        userDocument.setEmail(pNewUser.email());
        userDocument.setFullName(pNewUser.fullName());
        userDocument.setPhoneNumber(pNewUser.phoneNumber());
        userDocument.setProfile(pNewUser.profile());
        userDocument.setCountries(mapFromCountry(pNewUser.countries()));
        userDocument.setInternal(pNewUser.internal());
        userDocument.setStatus(Status.FIRST_ACCESS);
        userDocument.setOldPasswords(List.of(mPasswordEncoder.encode(newSecurePassword)));
        userDocument.setPassword(mPasswordEncoder.encode(newSecurePassword));
        userDocument.setAccountNonExpired(true);
        userDocument.setAccountNonLocked(true);
        userDocument.setEnabled(true);
        mUsersRepository.save(userDocument);
        return newSecurePassword;
    }

    private List<CountryDocument> mapFromCountry(List<Country> pContries) {
        return pContries.stream()
                .map(country ->
                        new CountryDocument(country.id(), country.name(), country.acronym())
                )
                .toList();
    }
}
