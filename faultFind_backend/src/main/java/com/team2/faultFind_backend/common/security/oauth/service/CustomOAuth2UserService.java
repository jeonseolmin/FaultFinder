package com.team2.faultFind_backend.common.security.oauth.service;

import com.team2.faultFind_backend.user.entity.ProviderType;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.entity.UserRole;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class CustomOAuth2UserService  extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider =
                userRequest.getClientRegistration()
                        .getRegistrationId();

        String providerId =
                oAuth2User.getAttribute("sub");

        String email =
                oAuth2User.getAttribute("email");

        String name =
                oAuth2User.getAttribute("name");

        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);
        if(user == null){

            user = User.builder()
                    .email(email)
                    .userName(name)
                    .password("SOCIAL")
                    .nickName("name")
                    .role(UserRole.ROLE_USER)
                    .provider(ProviderType.GOOGLE)
                    .providerId(providerId)
                    .build();

            userRepository.save(user);
        }
        return oAuth2User;
    }
}
