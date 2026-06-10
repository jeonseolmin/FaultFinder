package com.team2.faultFind_backend.user.dto;

import com.team2.faultFind_backend.user.entity.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class JoinDto {
    private String email;
    private String password;
    private String userName;
    private String nickName;
}
