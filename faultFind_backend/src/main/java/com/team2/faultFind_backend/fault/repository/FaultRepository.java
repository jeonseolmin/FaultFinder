package com.team2.faultFind_backend.fault.repository;

import com.team2.faultFind_backend.fault.entity.FaultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaultRepository extends JpaRepository<FaultEntity, Long> {
    // 특정 사고 코드(예: "보1")에 속하는 모든 가감산 수정 요소를 가져오는 메서드
    List<FaultEntity> findByCaseCode(String caseCode);
}