package com.team2.faultFind_backend.accident.service;

import com.team2.faultFind_backend.accident.entity.AccidentEntity;
import com.team2.faultFind_backend.accident.repository.AccidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AccidentService {

    private final AccidentRepository accidentRepository;

    // 전체 사고 유형 목록 조회 (화면 선택용)
    public List<AccidentEntity> getAllAccidents() {
        return accidentRepository.findAll();
    }

    // 단건 사고 조회
    public AccidentEntity getAccidentByCaseCode(String caseCode) {
        return accidentRepository.findByCaseCode(caseCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사고 코드입니다: " + caseCode));
    }
}