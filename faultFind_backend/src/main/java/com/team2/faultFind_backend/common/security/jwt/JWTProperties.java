package com.team2.faultFind_backend.common.security.jwt;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component @Getter
public class JWTProperties {
    private final String secret;
    private final Long accessExpiration;

    public JWTProperties(
            @Value("${spring.jwt.secret}") String secret,
            @Value("${spring.jwt.access-expiration}") Long accessExpiration
    ) {
        this.secret = secret;
        this.accessExpiration = accessExpiration;
    }
}


