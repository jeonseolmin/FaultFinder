package com.team2.faultFind_backend.fault.controller;

import com.team2.faultFind_backend.fault.entity.Fault;
import com.team2.faultFind_backend.fault.service.FaultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faults")
@RequiredArgsConstructor
public class FaultController {

    private final FaultService faultService;

    // 특정 사고에 적용 가능한 가감산 요소 목록 조회
    @GetMapping("/{caseCode}")
    public ResponseEntity<List<Fault>> getModifiersByCaseCode(@PathVariable String caseCode) {
        return ResponseEntity.ok(faultService.getModifiersByCaseCode(caseCode));
    }
}