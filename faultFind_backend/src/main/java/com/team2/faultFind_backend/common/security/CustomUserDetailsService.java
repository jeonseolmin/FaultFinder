package com.team2.faultFind_backend.common.security;

import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // email로 엔티티 가져오기
        if(! userRepository.existsByEmail(email)) return null;

        User userData = userRepository.findByEmail(email)
                .orElseThrow(()->
                        new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        // 로그인 정보를 이용해서 출입증 만들러 보내기
        return new CustomUserDetails(userData);
    }
}
