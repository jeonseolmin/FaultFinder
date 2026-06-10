package com.team2.faultFind_backend.calculator.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor // 기본 생성자는 JSON 직렬화/역직렬화에 필수입니다.
public class CalculationRequestDto {

    // 사용자가 선택한 사고 코드 (예: "보1")
    private String caseCode;

    // 사용자가 체크박스에서 선택한 가감산 요소의 ID 목록 (예: [1, 4, 5])
    private List<Long> modifierIds;

    // (선택) 만약 DTO를 직접 생성해서 테스트할 일이 있다면 아래 생성자도 추가합니다.
    public CalculationRequestDto(String caseCode, List<Long> modifierIds) {
        this.caseCode = caseCode;
        this.modifierIds = modifierIds;
    }
}