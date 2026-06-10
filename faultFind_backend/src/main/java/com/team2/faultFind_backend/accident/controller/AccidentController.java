package com.team2.faultFind_backend.accident.controller;

import com.team2.faultFind_backend.accident.entity.Accident;
import com.team2.faultFind_backend.accident.service.AccidentService;
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
    public ResponseEntity<List<Accident>> getAllAccidents() {
        return ResponseEntity.ok(accidentService.getAllAccidents());
    }

    // 단건 사고 기본 정보 조회
    @GetMapping("/{caseCode}")
    public ResponseEntity<Accident> getAccidentByCaseCode(@PathVariable String caseCode) {
        return ResponseEntity.ok(accidentService.getAccidentByCaseCode(caseCode));
    }
}