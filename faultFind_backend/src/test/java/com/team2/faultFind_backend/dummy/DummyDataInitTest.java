package com.team2.faultFind_backend.dummy;

import com.team2.faultFind_backend.question.entity.Question;
import com.team2.faultFind_backend.question.repository.QuestionRepository;
import com.team2.faultFind_backend.user.entity.UserRole;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class DummyDataInitTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("관리자, 일반 유저 및 테스트 게시글 생성")
    @Transactional
    @Rollback(false)
    void createDummyData() {
        // 1. 관리자(ADMIN) 생성
        User admin = User.builder()
                .email("admin@test.com")
                .password(passwordEncoder.encode("1234"))
                .userName("관리자")
                .role(UserRole.ROLE_ADMIN)
                .build();
        userRepository.saveAndFlush(admin);

        // 2. 일반 유저(USER) 생성
        User normalUser = User.builder()
                .email("user1@test.com")
                .password(passwordEncoder.encode("1234"))
                .userName("테스터1")
                .role(UserRole.ROLE_USER)
                .build();
        userRepository.saveAndFlush(normalUser);

        // 3. 유저가 작성한 테스트 게시글 생성
        for (int i = 1; i <= 5; i++) {
            Question question = Question.builder()
                    .user(normalUser)
                    .title("테스트 질문 제목 " + i)
                    .content("이 사고의 과실 비율이 궁금합니다. 도와주세요 (" + i + ")")
                    .status("OPEN")
                    .build();
            questionRepository.saveAndFlush(question);
        }

        System.out.println("더미 데이터 생성 완료!");
    }
}