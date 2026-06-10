package com.team2.faultFind_backend.user.repository;

import com.team2.faultFind_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);
}
