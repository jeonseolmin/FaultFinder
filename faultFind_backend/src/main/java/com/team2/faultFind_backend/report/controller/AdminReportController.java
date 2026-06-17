package com.team2.faultFind_backend.report.controller;

import com.team2.faultFind_backend.report.entity.Report;
import com.team2.faultFind_backend.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {

    private final ReportService reportService;

    // 관리자 전용 신고 내역 전체 조회 API
    @GetMapping
    public ResponseEntity<List<Report>> getReportList() {
        List<Report> reports = reportService.getAllReportsForAdmin();
        return ResponseEntity.ok(reports);
    }
}