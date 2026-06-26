package com.team2.faultFind_backend.admin.dto;

import com.team2.faultFind_backend.post.dto.PostResponse;
import com.team2.faultFind_backend.user.dto.UserResponse;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;



@Getter
@Builder
public class AdminDashboardResponse {

    private Page<UserResponse> users;
    private Page<PostResponse> posts;
}