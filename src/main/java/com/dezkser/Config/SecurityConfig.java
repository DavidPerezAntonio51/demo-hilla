package com.dezkser.Config;

import com.dezkser.Utils.PasswordGenerator;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {
    private final long MAX_AGE_IN_SECONDS = 31536000;

    @Bean
    PasswordEncoder getPasswordEnconder(){
        return new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2B);
    }
    @Bean
    PasswordGenerator getPasswordGenerator(){
        int defaultPasswordSize = 9;
        return new PasswordGenerator(defaultPasswordSize);
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers(customizer->customizer
                                .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                                        .includeSubDomains(true)
                                        .maxAgeInSeconds(MAX_AGE_IN_SECONDS)
                                        .requestMatcher(AnyRequestMatcher.INSTANCE)
                                )
                )
                .authorizeHttpRequests(customizer-> customizer
                        .requestMatchers("/images/*.png").permitAll()
                        .requestMatchers("/images/*.svg").permitAll()
                        .requestMatchers("/locales/*/public.json").permitAll()
                )
                .csrf(csrfCustomizer -> csrfCustomizer
                        .csrfTokenRepository(new HttpSessionCsrfTokenRepository())
                );
        super.configure(http);
        setLoginView(http,"/login");
    }
}
