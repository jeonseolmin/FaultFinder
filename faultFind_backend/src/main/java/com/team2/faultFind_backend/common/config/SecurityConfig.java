package com.team2.faultFind_backend.common.config;
import com.team2.faultFind_backend.common.security.jwt.JWTAuthenticationFilter;
import com.team2.faultFind_backend.common.security.jwt.JWTUtil;
import com.team2.faultFind_backend.common.security.jwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // csrf disable
        http
                .csrf((auth) -> auth.disable());
        // Form Login 방식  -> disable
        http
                .formLogin((auth) -> auth.disable());
        // http basic  인증 방식 -> disable
        http
                .httpBasic((auth) -> auth.disable());


        /*
            경로별 인가 작업
            Config 파일의 SecurityUrls에서 통합 관리
         */

        http
                .authorizeHttpRequests((auth) -> auth
                        // PUBLIC_URLS
                        .requestMatchers(
                                SecurityUrls.PUBLIC_URLS
                        ).permitAll()

                        // USER_URLS
                        .requestMatchers(
                                SecurityUrls.USER_URLS
                        ).hasAnyRole("USER", "ADMIN")

                        // ADMIN_URLS
                        .requestMatchers(
                                SecurityUrls.ADMIN_URLS
                        ).hasRole("ADMIN")

                        // 그 외
                        .anyRequest().authenticated()
                );

        LoginFilter loginFilter =
                new LoginFilter(
                        authenticationManager(authenticationConfiguration),
                        jwtUtil
                );

        loginFilter.setFilterProcessesUrl("/login");

        http
                .addFilterBefore(new JWTAuthenticationFilter(jwtUtil), LoginFilter.class);

        http
                .addFilterAt(
                        loginFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        http
                .sessionManagement((session) ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // cors 설정
        http
                .cors(cors -> cors.configurationSource(request -> {

                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(
                            List.of("http://localhost:3000")
                    );
                    config.setAllowedMethods(
                            List.of("*")
                    );
                    config.setAllowedHeaders(
                            List.of("*")
                    );
                    config.setExposedHeaders(
                            List.of("Authorization")
                    );
                    config.setAllowCredentials(true);
                    return config;
                }));

        return http.build();
    }
}