package com.team2.faultFind_backend.ai.controller;

import com.team2.faultFind_backend.ai.dto.AiRequest;
import com.team2.faultFind_backend.ai.dto.AiResponse;
import com.team2.faultFind_backend.ai.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faultfinder/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/ask")
    public ResponseEntity<AiResponse> ask(@RequestBody AiRequest request) {
        return ResponseEntity.ok(aiService.ask(request));
    }

}