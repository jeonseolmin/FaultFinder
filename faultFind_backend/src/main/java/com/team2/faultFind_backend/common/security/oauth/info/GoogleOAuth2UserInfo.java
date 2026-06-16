package com.team2.faultFind_backend.common.security.oauth.info;

import lombok.RequiredArgsConstructor;
import com.team2.faultFind_backend.user.entity.ProviderType;
import java.util.Map;

@RequiredArgsConstructor
public class GoogleOAuth2UserInfo implements OAuth2UserInfo{
    private final Map<String, Object> attributes;

    @Override
    public ProviderType getProviderType() {
        return ProviderType.GOOGLE;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("sub"));
    }

    @Override
    public String getEmail() {
        return String.valueOf(attributes.get("email"));
    }

    @Override
    public String getName() {
        return String.valueOf(attributes.get("name"));
    }
}
