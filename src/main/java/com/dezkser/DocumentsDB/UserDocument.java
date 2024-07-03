package com.dezkser.DocumentsDB;

import lombok.*;
import com.dezkser.DocumentsDB.Constants.Status;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Document("users")
public class UserDocument extends AbstractDocument implements
        UserDetails, CredentialsContainer {
    @Id
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String profile;
    private Status status;
    @DBRef
    private List<CountryDocument> countries = new LinkedList<>();
    private Boolean internal;
    private String password;
    private List<String> oldPasswords = new LinkedList<>();
    private Instant lastPasswordChange;
    private Boolean accountNonExpired;
    private Boolean accountNonLocked;
    private Boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getAuthoritiesFromDocument();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * If is a new user, the system will permit the login, otherwise will check
     * the lastPasswordChange field to verify that it has not exceeded 90 days
     */
    @Override
    public boolean isCredentialsNonExpired() {
        if(this.status.equals(Status.FIRST_ACCESS)){
            return true;
        }
        Instant passwordExpirationDate = lastPasswordChange.plus(90, ChronoUnit.DAYS);
        return passwordExpirationDate.isAfter(Instant.now());
    }

    /**
     * The system will check if a user has an active account, otherwise would not
     * permit the access.
     */
    @Override
    public boolean isEnabled() {
        return !this.status.equals(Status.INACTIVE);
    }
    private List<GrantedAuthority> getAuthoritiesFromDocument(){
        return List.of(new SimpleGrantedAuthority("ROLE_"+this.profile));
    }

    /**
     * Method used by spring security to avoid a potential heap inspection
     */
    @Override
    public void eraseCredentials() {
        this.password = null;
        this.oldPasswords = new LinkedList<>();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserDocument that = (UserDocument) o;
        return username.equals(that.username);
    }

    @Override
    public int hashCode() {
        return username.hashCode();
    }
}
