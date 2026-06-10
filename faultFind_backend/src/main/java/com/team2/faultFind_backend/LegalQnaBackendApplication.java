package com.team2.faultFind_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class LegalQnaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LegalQnaBackendApplication.class, args);
    }

}
