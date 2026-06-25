package com.team2.faultFind_backend.user.repository;

import com.team2.faultFind_backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    List<User> findAll();
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndUserName(String email, String userName);
}
