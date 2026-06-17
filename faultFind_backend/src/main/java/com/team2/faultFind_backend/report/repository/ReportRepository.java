package com.team2.faultFind_backend.report.repository;

import com.team2.faultFind_backend.report.entity.Report;
import com.team2.faultFind_backend.report.entity.ReportTargetType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {

    // 특정 사용자가 특정 대상(게시글/댓글)을 이미 신고했는지 확인하는 메서드 (중복 신고 차단용)
    boolean existsByReporterEmailAndTargetTypeAndTargetId(
            String reporterEmail,
            ReportTargetType targetType,
            Long targetId
    );
}