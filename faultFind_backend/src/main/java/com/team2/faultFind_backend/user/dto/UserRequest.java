package com.team2.faultFind_backend.user.dto;


import lombok.Data;

@Data
public class UserRequest {
    private String email;
    private String password;
    private String userName;
}
