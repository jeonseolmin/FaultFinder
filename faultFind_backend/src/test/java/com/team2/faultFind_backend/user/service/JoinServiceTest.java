package com.team2.faultFind_backend.user.service;

import com.team2.faultFind_backend.user.dto.JoinDto;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JoinServiceTest {
    @Autowired
    private JoinService joinService;

    @Autowired
    private UserRepository userRepository;
    @Test
    void signUp() {
        JoinDto dto = new JoinDto();
        dto.setEmail("test@test.com");
        dto.setUserName("test");
        dto.setPassword("1234");

        joinService.signUp(dto);

        User user =
                userRepository.findByEmail("test@test.com")
                        .orElseThrow();

        assertEquals("test", user.getUserName());
    }
}