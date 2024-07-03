package com.dezkser.Services;

import com.dezkser.DocumentsDB.UserDocument;
import com.dezkser.Repositories.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UsersRepository mUsersRepository;

    public UserDetailsServiceImpl(UsersRepository pUsersRepository) {
        this.mUsersRepository = pUsersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String pUsername) throws UsernameNotFoundException {
        Optional<UserDocument> optionalUser = mUsersRepository.findByUsername(pUsername);
        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("user not found");
        }
        return optionalUser.get();
    }
}
