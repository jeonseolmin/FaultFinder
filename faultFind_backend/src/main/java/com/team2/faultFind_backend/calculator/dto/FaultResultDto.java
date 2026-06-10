package com.team2.faultFind_backend.calculator.dto;

import lombok.Getter;

@Getter
public class FaultResultDto {
    private final String caseCode;
    private final String title;
    private final String partyAName;
    private final int finalFaultA;
    private final String partyBName;
    private final int finalFaultB;

    public FaultResultDto(String caseCode, String title, String partyAName, int finalFaultA, String partyBName, int finalFaultB) {
        this.caseCode = caseCode;
        this.title = title;
        this.partyAName = partyAName;
        this.finalFaultA = finalFaultA;
        this.partyBName = partyBName;
        this.finalFaultB = finalFaultB;
    }
}