package com.team2.faultFind_backend.user.dto;


import lombok.Data;

@Data
public class JoinRequest {
    private String email;
    private String password;
    private String userName;
    private String nickName;
}
