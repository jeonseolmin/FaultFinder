package com.team2.faultFind_backend.fault.service;

import com.team2.faultFind_backend.fault.entity.Fault;
import com.team2.faultFind_backend.fault.repository.FaultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FaultService {

    private final FaultRepository faultRepository;

    // 특정 사고의 가감산 요소 리스트 조회 (화면 체크박스 출력용)
    public List<Fault> getModifiersByCaseCode(String caseCode) {
        return faultRepository.findByCaseCode(caseCode);
    }

    // 사용자가 선택한 ID들로 가감산 요소들을 일괄 조회
    public List<Fault> getModifiersByIds(List<Long> ids) {
        return faultRepository.findAllById(ids);
    }
}