package com.team2.faultFind_backend.accidentdetail.entity;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "accident_case_details")
@Data
@Entity
public class AccidentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="case_code")
    private String caseCode;

    @Column(name="base_fault_explanation", columnDefinition = "TEXT")
    private String baseFaultExplanation;

    @Column(name="modifier_explanation")
    private String modifierExplanation;

    @Column(name="usage_note")
    private String usageNote;

    @Column(name="legal_reference")
    private String legalReference;

    @Column(name="precedent")
    private String precedent;

}
