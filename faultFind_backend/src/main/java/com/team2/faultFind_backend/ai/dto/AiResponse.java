package com.team2.faultFind_backend.ai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class AiResponse {

    private String question;

    private String answer;


    private List<OfficialChunkDto> officialChunks;

    private List<YoutubeChunkDto> youtubeChunks;

}