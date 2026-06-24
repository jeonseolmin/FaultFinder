package com.team2.faultFind_backend.accident.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccidentResponse {
    private String caseCode;
    private String category;
    private String title;
    private String partyAName;
    private String partyBName;
    private int baseFaultA;
    private int baseFaultB;
}