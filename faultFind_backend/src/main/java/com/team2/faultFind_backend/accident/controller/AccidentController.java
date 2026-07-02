package com.team2.faultFind_backend.accident.controller;

import com.team2.faultFind_backend.accident.dto.AccidentResponse.MainCategoryDto;
import com.team2.faultFind_backend.accident.dto.AccidentResponse.TitleDto;
import com.team2.faultFind_backend.accident.service.AccidentService;
import com.team2.faultFind_backend.accidentdetail.dto.AccidentDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accidents")
@RequiredArgsConstructor
public class AccidentController {

    private final AccidentService accidentService;

    // 전체 사고 유형 목록 조회
    @GetMapping
    public ResponseEntity<List<TitleDto>> getAllAccidents() {
        List<TitleDto> data = accidentService.getAllAccidents();
        return ResponseEntity.ok(data);
    }

    // 단건 사고 기본 정보 조회
    @GetMapping("/{caseCode}")
    public ResponseEntity<TitleDto> getAccidentByCaseCode(@PathVariable String caseCode) {
        TitleDto data = accidentService.getAccidentByCaseCode(caseCode);
        return ResponseEntity.ok(data);
    }

    // 카테고리별 4단계 아코디언 트리 구조 데이터 조회
    @GetMapping("/category")
    public ResponseEntity<List<MainCategoryDto>> getAccidentsByCategory(@RequestParam String category) {
        List<MainCategoryDto> groupedData = accidentService.getGroupedAccidentsByCategory(category);
        return ResponseEntity.ok(groupedData);
    }

    // 상세 내용 조회
    @GetMapping("/{caseCode}/detail")
    public ResponseEntity<AccidentDetailResponse> getDetail(@PathVariable String caseCode) {
        AccidentDetailResponse detail = accidentService.getDetail(caseCode);
        return ResponseEntity.ok(detail);
    }
}