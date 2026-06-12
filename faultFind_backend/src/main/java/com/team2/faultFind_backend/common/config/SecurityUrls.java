package com.team2.faultFind_backend.common.config;

public class SecurityUrls {

    public static final String[] PUBLIC_URLS = {
            "/",
            "/login",
            "/join",
            "/accidentguide",
            "/accidentcase",
            "/faultsearch",
            "/community"
    };

    public static final String[] ADMIN_URLS = {
            "/admin/**"
    };

    public static final String[] USER_URLS = {
            "/mypage/**",
            "/question/**",
            "/answer/**"
    };

    private SecurityUrls() {
    }
}
