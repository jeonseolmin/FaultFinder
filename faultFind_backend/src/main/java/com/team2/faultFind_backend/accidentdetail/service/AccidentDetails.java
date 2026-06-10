package com.team2.faultFind_backend.accidentdetail.service;

import com.team2.faultFind_backend.accidentdetail.repository.AccidentDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AccidentDetails {
    private final AccidentDetailsRepository accidentDetailsRepository;
}
