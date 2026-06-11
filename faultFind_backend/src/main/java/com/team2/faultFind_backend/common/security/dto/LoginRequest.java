package com.team2.faultFind_backend.common.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 프론트에서 보내는 로그인 정보를 담을 DTO
public class LoginRequest {
    private String email;
    private String password;
}