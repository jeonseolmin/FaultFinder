package com.team2.faultFind_backend.accident.repository;

import com.team2.faultFind_backend.accident.entity.AccidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccidentRepository extends JpaRepository<AccidentEntity, Long> {
    // 사고 코드(예: "보1")로 사고 정보를 조회하는 메서드
    Optional<AccidentEntity> findByCaseCode(String caseCode);
}