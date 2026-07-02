package com.team2.faultFind_backend.ai.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AiRequest {

    private String question;

    private Integer limit = 3;

}