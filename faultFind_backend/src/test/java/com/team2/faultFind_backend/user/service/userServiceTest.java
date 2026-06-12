package com.team2.faultFind_backend.user.service;

import com.team2.faultFind_backend.user.dto.JoinRequest;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class userServiceTest {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @Test
    void signUp() {
        JoinRequest dto = new JoinRequest();
        dto.setEmail("test@test.com");
        dto.setUserName("test");
        dto.setPassword("1234");

        userService.signUp(dto);

        User user =
                userRepository.findByEmail("test@test.com")
                        .orElseThrow();

        assertEquals("test", user.getUserName());
    }
}