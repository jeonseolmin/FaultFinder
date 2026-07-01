package com.team2.faultFind_backend.user.entity;

import com.team2.faultFind_backend.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Builder
@Table(name="users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;
    private String userName;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    private ProviderType provider;

    @Column(name = "provider_id")
    private String providerId;

    @Column(nullable = false)
    private boolean isSuspended = false; // 기본값은 false (정상 활동 중)
}
