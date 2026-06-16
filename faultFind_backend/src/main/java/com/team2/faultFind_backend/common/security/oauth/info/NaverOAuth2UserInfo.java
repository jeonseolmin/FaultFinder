package com.team2.faultFind_backend.common.security.oauth.info;

import com.team2.faultFind_backend.user.entity.ProviderType;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class NaverOAuth2UserInfo implements OAuth2UserInfo {
    private final Map<String, Object> attributes;

    private Map<String, Object> getResponse() {
        return (Map<String, Object>) attributes.get("response");
    }

    @Override
    public ProviderType getProviderType() {
        return ProviderType.NAVER;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(getResponse().get("id"));
    }

    @Override
    public String getEmail() {
        return String.valueOf(getResponse().get("email"));
    }

    @Override
    public String getName() {
        return String.valueOf(getResponse().get("name"));
    }
}
