package com.team2.faultFind_backend.accidentdetail.controller;

import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import com.team2.faultFind_backend.accidentdetail.service.AccidentDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accident-details")
@RequiredArgsConstructor
public class AccidentDetailsController {

    private final AccidentDetailsService accidentDetailsService;

    // 특정 사고의 세부 사항 조회
    @GetMapping("/{caseCode}")
    public ResponseEntity<AccidentDetails> getAccidentDetails(@PathVariable String caseCode) {
        return ResponseEntity.ok(accidentDetailsService.getAccidentDetailsByCaseCode(caseCode));
    }
}