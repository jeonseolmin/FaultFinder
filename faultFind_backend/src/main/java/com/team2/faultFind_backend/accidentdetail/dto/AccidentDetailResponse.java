package com.team2.faultFind_backend.accidentdetail.dto;
import com.team2.faultFind_backend.fault.dto.FaultResponse;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class AccidentDetailResponse {

    private String caseCode;
    private String category;
    private String title;

    private String partyAName;
    private String partyBName;

    private int baseFaultA;
    private int baseFaultB;

    private String accidentSituation;
    private String baseFaultExplanation;
    private String modifierExplanation;
    private String usageNote;
    private String legalReference;
    private String precedent;

    private List<FaultResponse> modifiers;
}