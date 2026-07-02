package com.team2.faultFind_backend.ai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class OfficialChunkDto {

    private String caseCode;

    private String title;

    private String category;

    private String chunkText;

    private Integer baseFaultA;

    private Integer baseFaultB;

    private Double distance;

}