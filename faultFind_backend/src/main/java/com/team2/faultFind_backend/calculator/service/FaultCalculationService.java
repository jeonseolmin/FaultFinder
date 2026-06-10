package com.team2.faultFind_backend.calculator.service;

import com.team2.faultFind_backend.accident.entity.Accident;
import com.team2.faultFind_backend.accident.service.AccidentService;
import com.team2.faultFind_backend.calculator.dto.FaultResultDto;
import com.team2.faultFind_backend.fault.entity.Fault;
import com.team2.faultFind_backend.fault.service.FaultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FaultCalculationService {

    // 각 패키지의 서비스를 주입받아 사용합니다. (낮은 결합도 유지)
    private final AccidentService accidentService;
    private final FaultService faultService;

    /**
     * 최종 과실 비율 계산 로직
     * @param caseCode 선택된 사고 코드 (예: "보1")
     * @param selectedModifierIds 사용자가 체크박스에서 선택한 가감산 요소 ID 리스트
     */
    public FaultResultDto calculate(String caseCode, List<Long> selectedModifierIds) {

        // 1. 기본 사고 정보 및 기본 과실 비율 가져오기
        Accident accident = accidentService.getAccidentByCaseCode(caseCode);
        int finalFaultA = accident.getBaseFaultA();

        // 2. 선택된 가감산 요소들이 있다면 가져와서 합산하기
        if (selectedModifierIds != null && !selectedModifierIds.isEmpty()) {
            List<Fault> selectedModifiers = faultService.getModifiersByIds(selectedModifierIds);

            int totalChange = selectedModifiers.stream()
                    .mapToInt(Fault::getChangeValue)
                    .sum();

            finalFaultA += totalChange;
        }

        // 3. 과실 비율 한계값 보정 (0% 미만이 될 수 없고, 100%를 초과할 수 없음)
        finalFaultA = Math.max(0, Math.min(100, finalFaultA));
        int finalFaultB = 100 - finalFaultA;

        // 4. 결과 DTO 반환
        return new FaultResultDto(
                accident.getCaseCode(),
                accident.getTitle(),
                accident.getPartyAName(),
                finalFaultA,
                accident.getPartyBName(),
                finalFaultB
        );
    }
}