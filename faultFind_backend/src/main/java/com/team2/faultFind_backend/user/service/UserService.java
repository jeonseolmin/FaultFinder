package com.team2.faultFind_backend.user.service;

import com.team2.faultFind_backend.common.security.dto.LoginRequest;
import com.team2.faultFind_backend.common.security.jwt.JwtUtil;
import com.team2.faultFind_backend.user.dto.PasswordChangeDto; // 🌟 잊지 말고 DTO 임포트 추가!
import com.team2.faultFind_backend.user.dto.UserRequest;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.entity.ProviderType;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.entity.UserRole;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입 서비스
    public void signUp(UserRequest userRequest) {
        // 이메일 중복 확인
        boolean isExist = userRepository.existsByEmail(userRequest.getEmail());
        if (isExist) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        // 특정 이메일이거나 특정 도메인을 쓰면 관리자로 가입
        UserRole role = UserRole.ROLE_USER;
        if (userRequest.getEmail().equals("admin@test.com") || userRequest.getEmail().endsWith("@roadlaw.com")) {
            role = UserRole.ROLE_ADMIN;
        }
        // 새로운 유저면 엔티티 만들고 저장
        User data = User.builder()
                .email(userRequest.getEmail())
                .userName(userRequest.getUserName())
                .password(bCryptPasswordEncoder.encode(userRequest.getPassword()))
                .role(role)
                .provider(ProviderType.LOCAL)
                .providerId(null)
                .isSuspended(false)
                .build();
        userRepository.save(data);
    }

    // 로그인
    public String login(LoginRequest loginRequest){
        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElse(null);

        if(user == null){
            return null;
        }

        boolean matches = bCryptPasswordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if(!matches){
            return null;
        }

        return jwtUtil.createJwt(
                user.getEmail(),
                user.getRole().name()
        );
    }

    public UserResponse getMyInfo(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("사용자를 찾을 수 없습니다."));

        return UserResponse.builder()
                .email(user.getEmail())
                .userName(user.getUserName())
                .build();
    }

    // 비밀번호 변경 로직
    public void changePassword(String email, PasswordChangeDto dto) {
        // 1. 로그인한 유저 찾기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        // 2. 현재 비밀번호 일치 여부 확인 (기존에 쓰시던 bCryptPasswordEncoder 활용)
        if (!bCryptPasswordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 3. 새 비밀번호 암호화 후 변경
        user.setPassword(bCryptPasswordEncoder.encode(dto.getNewPassword()));
    }
}