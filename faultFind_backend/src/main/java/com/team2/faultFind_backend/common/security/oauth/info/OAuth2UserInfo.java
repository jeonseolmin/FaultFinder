package com.team2.faultFind_backend.common.security.oauth.info;

import com.team2.faultFind_backend.user.entity.ProviderType;

public interface OAuth2UserInfo {
    ProviderType getProviderType();
    String getProviderId();
    String getEmail();
    String getName();
}
