package com.team2.faultFind_backend.common.config;

public class SecurityUrls {

    public static final String[] PUBLIC_URLS = {
            "/api",
            "/api/auth/**",
            "/api/auth/login",

            "/api/signup",

            "/api/accident-guides",
            "/api/accident-guides/**",

            "/api/accident-cases",
            "/api/accident-cases/**",

            "/api/accidents/**",

            "/api/fault-ratios",
            "/api/community",

            "/oauth2/**",
            "/login/oauth2/**"
    };

    public static final String[] ADMIN_URLS = {
            "/api/admin/**"
    };

    public static final String[] USER_URLS = {
            "/api/users/",
            "/api/users/**",

            "/api/mypage",
            "/api/mypage/**",

            "/api/question",
            "/api/question/**",

            "/api/answer",
            "/api/answer/**",

            "/api/community/**",
    };

    private SecurityUrls() {
    }
}
