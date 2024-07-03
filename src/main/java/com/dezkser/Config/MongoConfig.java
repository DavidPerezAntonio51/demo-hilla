package com.dezkser.Config;

import com.dezkser.Utils.CustomAuditorAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@Configuration
@EnableMongoAuditing
public class MongoConfig {

    @Bean
    public AuditorAware<String > myAuditorProvider() {
        return new CustomAuditorAware();
    }
}
