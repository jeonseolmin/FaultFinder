package com.team2.faultFind_backend.accidentDetails.service;

import com.team2.faultFind_backend.accidentDetails.repository.AccidentDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AccidentDetails {
    private final AccidentDetailsRepository accidentDetailsRepository;
}
