package com.team2.faultFind_backend.user.dto;

import com.team2.faultFind_backend.post.dto.PostResponse;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Builder
public class MyPageResponseDto {

    private UserResponse user;

    private Page<PostResponse> posts;
    private Page<MyCommentResponse> comments;
}