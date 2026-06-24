package com.team2.faultFind_backend.accident.service;

import com.team2.faultFind_backend.accident.dto.AccidentResponse;
import com.team2.faultFind_backend.accident.entity.Accident;
import com.team2.faultFind_backend.accident.repository.AccidentRepository;
import com.team2.faultFind_backend.accidentdetail.dto.AccidentDetailResponse;
import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import com.team2.faultFind_backend.accidentdetail.repository.AccidentDetailsRepository;
import com.team2.faultFind_backend.fault.dto.FaultResponse;
import com.team2.faultFind_backend.fault.repository.FaultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccidentService {

    private final AccidentRepository accidentRepository;
    private final AccidentDetailsRepository accidentDetailsRepository;
    private final FaultRepository faultRepository;

    public AccidentDetailResponse getDetail(String caseCode) {
        Accident accident = accidentRepository.findById(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사고 코드입니다: " + caseCode));

        AccidentDetails detail = accidentDetailsRepository
                .findByCaseCode(caseCode)
                .orElse(null);

        List<FaultResponse> modifiers = faultRepository.findByCaseCode(caseCode)
                .stream()
                .map(f -> FaultResponse.builder()
                        .modifierName(f.getModifierName())
                        .changeValue(f.getChangeValue())
                        .build())
                .toList();

        return AccidentDetailResponse.builder()
                .caseCode(accident.getCaseCode())
                .category(accident.getCategory())
                .title(accident.getTitle())
                .partyAName(accident.getPartyAName())
                .partyBName(accident.getPartyBName())
                .baseFaultA(accident.getBaseFaultA())
                .baseFaultB(accident.getBaseFaultB())
                .accidentSituation(detail != null ? detail.getAccidentSituation() : null)
                .baseFaultExplanation(detail != null ? detail.getBaseFaultExplanation() : null)
                .modifierExplanation(detail != null ? detail.getModifierExplanation() : null)
                .legalReference(detail != null ? detail.getLegalReference() : null)
                .modifiers(modifiers)
                .build();
    }

    public List<AccidentResponse> getAllAccidents() {
        return accidentRepository.findAll()
                .stream()
                .map(this::toAccidentResponse)
                .toList();
    }

    public AccidentResponse getAccidentByCaseCode(String caseCode) {
        Accident accident = accidentRepository.findById(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사고 코드입니다: " + caseCode));

        return toAccidentResponse(accident);
    }

    public List<AccidentResponse> getAccidentsByCategory(String category) {
        return accidentRepository.findByCategory(category)
                .stream()
                .map(this::toAccidentResponse)
                .toList();
    }

    private AccidentResponse toAccidentResponse(Accident accident) {
        return AccidentResponse.builder()
                .caseCode(accident.getCaseCode())
                .category(accident.getCategory())
                .title(accident.getTitle())
                .partyAName(accident.getPartyAName())
                .partyBName(accident.getPartyBName())
                .baseFaultA(accident.getBaseFaultA())
                .baseFaultB(accident.getBaseFaultB())
                .build();
    }
}