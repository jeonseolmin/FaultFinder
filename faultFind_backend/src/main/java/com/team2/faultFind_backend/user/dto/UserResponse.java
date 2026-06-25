package com.team2.faultFind_backend.user.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.team2.faultFind_backend.user.entity.ProviderType;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.entity.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Builder
public class UserResponse {
    private Long id;

    private String email;

    private String userName;

    private UserRole role;

    private ProviderType provider;

    private boolean suspended;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .userName(user.getUserName())
                .role(user.getRole())
                .provider(user.getProvider())
                .suspended(user.isSuspended())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
