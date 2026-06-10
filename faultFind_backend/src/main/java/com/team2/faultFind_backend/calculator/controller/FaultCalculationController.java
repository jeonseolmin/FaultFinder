package com.team2.faultFind_backend.calculator.controller;

import com.team2.faultFind_backend.calculator.dto.CalculationRequestDto;
import com.team2.faultFind_backend.calculator.dto.FaultResultDto;
import com.team2.faultFind_backend.calculator.service.FaultCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculate")
@RequiredArgsConstructor
public class FaultCalculationController {

    private final FaultCalculationService faultCalculationService;

    // 최종 과실 비율 계산 수행
    @PostMapping
    public ResponseEntity<FaultResultDto> calculateFinalFault(@RequestBody CalculationRequestDto request) {
        FaultResultDto result = faultCalculationService.calculate(
                request.getCaseCode(),
                request.getModifierIds()
        );
        return ResponseEntity.ok(result);
    }
}