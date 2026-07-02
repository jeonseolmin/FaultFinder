package com.team2.faultFind_backend.ai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class YoutubeChunkDto {

    private Long id;

    private String sourceType;

    private String sourceId;

    private String title;

    private String chunkText;

    private Integer chunkIndex;

    private Integer faultRatioA;

    private Integer faultRatioB;

    private String confidence;

    private Double distance;

}