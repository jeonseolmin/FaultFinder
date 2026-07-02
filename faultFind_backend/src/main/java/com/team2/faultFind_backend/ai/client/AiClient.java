package com.team2.faultFind_backend.ai.client;

import com.team2.faultFind_backend.ai.dto.AiRequest;
import com.team2.faultFind_backend.ai.dto.AiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class AiClient {

    private final RestClient restClient;

    public AiClient(@Value("${ai.server.url}") String aiServerUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(aiServerUrl)
                .requestFactory(new SimpleClientHttpRequestFactory())
                .build();
    }

    public AiResponse ask(AiRequest request) {
        return restClient.post()
                .uri("/rag/ask")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(AiResponse.class);
    }
}