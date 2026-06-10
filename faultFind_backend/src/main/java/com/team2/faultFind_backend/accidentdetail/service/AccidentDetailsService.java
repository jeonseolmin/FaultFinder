package com.team2.faultFind_backend.accidentdetail.service;

import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import com.team2.faultFind_backend.accidentdetail.repository.AccidentDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccidentDetailsService {

    private final AccidentDetailsRepository accidentDetailsRepository;

    public AccidentDetails getAccidentDetailsByCaseCode(String caseCode) {
        return accidentDetailsRepository.findByCaseCode(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("해당 사고 코드의 세부 사항을 찾을 수 없습니다: " + caseCode));
    }
}