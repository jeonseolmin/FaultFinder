package com.team2.faultFind_backend.common.security.oauth.handler;

import com.team2.faultFind_backend.common.security.CustomUserDetails;
import com.team2.faultFind_backend.common.security.jwt.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        // JWT 생성

        CustomUserDetails customUserDetails =
                (CustomUserDetails) authentication.getPrincipal();

        String email = customUserDetails.getEmail();
        String role = customUserDetails.getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        String token = jwtUtil.createJwt(email, role);

        response.sendRedirect(
                "http://15.134.31.11/oauth-success?token=" + token
        );
    }
}
