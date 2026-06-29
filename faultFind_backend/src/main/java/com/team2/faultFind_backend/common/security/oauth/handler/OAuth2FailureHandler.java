package com.team2.faultFind_backend.common.security.oauth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure
            (HttpServletRequest request,
             HttpServletResponse response
                    , AuthenticationException exception
            ) throws IOException {
        exception.printStackTrace();
        response.sendRedirect("http:/15.134.31.11/login?error=oauth");
    }
}
