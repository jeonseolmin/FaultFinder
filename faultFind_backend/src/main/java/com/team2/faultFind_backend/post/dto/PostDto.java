package com.team2.faultFind_backend.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {
    private String category;
    private String title;
    private String content;

    @JsonProperty("isNotice")
    private boolean isNotice;
}