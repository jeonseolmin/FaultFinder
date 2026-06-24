package com.team2.faultFind_backend.fault.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FaultResponse {

    private String modifierName;
    private int changeValue;
}