package com.team2.faultFind_backend.common.config;

public class SecurityUrls {

    public static final String[] PUBLIC_URLS = {
            "/",
            "/faultfinder/login",
            "/faultfinder/join",
            "/faultfinder/accidentguide",
            "/faultfinder/accidentcase",
            "/faultfinder/faultsearch",
            "/faultfinder/community"
    };

    public static final String[] ADMIN_URLS = {
            "/faultfinder/admin/**"
    };

    public static final String[] USER_URLS = {
            "/faultfinder/mypage/**",
            "/faultfinder/question/**",
            "/faultfinder/answer/**"
    };

    private SecurityUrls() {
    }
}
