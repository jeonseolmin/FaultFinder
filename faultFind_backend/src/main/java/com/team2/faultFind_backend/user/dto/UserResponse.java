package com.team2.faultFind_backend.user.dto;


import lombok.Builder;
import lombok.Data;

@Data @Builder
public class UserResponse {
    private String email;
    private String userName;
    private String nickName;
}
