package com.team2.faultFind_backend.admin.service;

import com.team2.faultFind_backend.admin.dto.AdminDashboardResponse;
import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.post.repository.PostRepository;
import com.team2.faultFind_backend.user.dto.UserResponse;
import com.team2.faultFind_backend.user.entity.User;
import com.team2.faultFind_backend.user.entity.UserRole;
import com.team2.faultFind_backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard(
            String email,
            Pageable userPageable,
            Pageable postPageable
    ) {
        User loginUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        if (!UserRole.ROLE_ADMIN.equals(loginUser.getRole())) {
            throw new IllegalArgumentException("관리자 권한이 없습니다.");
        }

        Page<UserResponse> users = userRepository.findAll(userPageable)
                .map(UserResponse::from);

        Page<PostResponse> posts = postRepository.findAll(postPageable)
                .map(PostResponse::from);

        return AdminDashboardResponse.builder()
                .users(users)
                .posts(posts)
                .build();
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        user.setRole(UserRole.ROLE_WITHDRAWN);
    }

    public boolean toggleSuspend(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        user.setSuspended(!user.isSuspended());

        return user.isSuspended();
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}