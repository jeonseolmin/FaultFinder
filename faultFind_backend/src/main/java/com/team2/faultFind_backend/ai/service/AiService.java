package com.team2.faultFind_backend.ai.service;

import com.team2.faultFind_backend.ai.client.AiClient;
import com.team2.faultFind_backend.ai.dto.AiRequest;
import com.team2.faultFind_backend.ai.dto.AiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiService {

    private final AiClient aiClient;

    public AiResponse ask(AiRequest request) {

        if (request.getLimit() == null) {
            request.setLimit(3);
        }

        return aiClient.ask(request);

    }

}