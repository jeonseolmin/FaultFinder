package com.team2.faultFind_backend.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostRequest {
    private String category;
    private String title;
    private String content;
    private boolean notice;
}

