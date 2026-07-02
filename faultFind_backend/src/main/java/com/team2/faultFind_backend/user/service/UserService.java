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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtUtil;

    // 회원가입 서비스
    public void signUp(UserRequest userRequest) {
        // 1. 이메일로 기존 유저가 있는지 먼저 조회합니다.
        Optional<User> existingUserOpt = userRepository.findByEmail(userRequest.getEmail());

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            // 만약 임시 탈퇴된 유저라면? 기존 로우(Row)를 재활용하여 가입 허용!
            if (existingUser.getRole() == UserRole.ROLE_WITHDRAWN) {
                existingUser.setUserName(userRequest.getUserName());
                existingUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
                existingUser.setRole(UserRole.ROLE_USER); // 다시 일반 유저로 복구!
                existingUser.setSuspended(false);         // 혹시 정지 상태였다면 정지도 해제

                // @Transactional이 걸려있으므로 코드가 끝나면 자동으로 DB가 새 정보로 업데이트됩니다.
                return;
            } else {
                // 정상 활동 중인 유저가 이미 있다면 중복 에러 처리
                throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
            }
        }

        // 2. 아예 처음 가입하는 신규 유저라면 기존 방식대로 새로 생성
        UserRole role = UserRole.ROLE_USER;
        if (userRequest.getEmail().equals("admin@test.com") || userRequest.getEmail().endsWith("@roadlaw.com")) {
            role = UserRole.ROLE_ADMIN;
        }

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

        // 아예 가입한 적이 없는 사람인 경우
        if(user == null){
            return null;
        }

        // 임시 탈퇴 상태인 경우 로그인 차단 및 안내 메시지 송출
        if(user.getRole() == UserRole.ROLE_WITHDRAWN) {
            throw new IllegalArgumentException("임시 탈퇴 처리된 계정입니다. 새롭게 회원가입을 진행해주세요.");
        }

        // 정상 유저라면 비밀번호 검사 진행
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

    public String findPassword(String email, String userName) {
        // 1. 이메일과 이름이 모두 일치하는 유저 찾기
        User user = userRepository.findByEmailAndUserName(email, userName)
                .orElseThrow(() -> new IllegalArgumentException("입력하신 정보와 일치하는 계정이 없습니다."));

        // 2. 4자리 임시 비밀번호 생성
        String tempPassword = generateTempPassword(4);

        // 3. 비밀번호 암호화 후 DB 업데이트
        user.setPassword(bCryptPasswordEncoder.encode(tempPassword));

        // 4. 프론트엔드 화면에 띄워주기 위해 생성된 임시 비밀번호를 리턴!
        return tempPassword;
    }

    //  2. 랜덤 문자열 생성기
    private String generateTempPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

    public UserResponse findByEmail(String email) {
        return UserResponse.
                from(userRepository.findByEmail(email)
                .orElseThrow(()->new IllegalArgumentException("다른 email 입니다.")));
    }

    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::from)
                .toList();
    }

    public void deleteById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("회원이 없습니다."));
        user.setRole(UserRole.ROLE_WITHDRAWN);
    }

    public UserResponse findById(Long id) {
        return UserResponse.
                from(userRepository.findById(id)
                        .orElseThrow(()->new IllegalArgumentException("다른 email 입니다.")));
    }

    public void save(UserResponse user) {
    }

    public void withdrawSelf(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입된 회원이 아닙니다."));

        user.setRole(UserRole.ROLE_WITHDRAWN);
    }
}