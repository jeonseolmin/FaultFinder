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

    @Column(name="accident_situation" , columnDefinition = "TEXT")
    private String accidentSituation;

    @Column(name="base_fault_explanation", columnDefinition = "TEXT")
    private String baseFaultExplanation;

    @Column(name="modifier_explanation", columnDefinition = "TEXT")
    private String modifierExplanation;

    @Column(name="usage_note", columnDefinition = "TEXT")
    private String usageNote;

    @Column(name="legal_reference", columnDefinition = "TEXT")
    private String legalReference;

    @Column(name="precedent", columnDefinition = "TEXT")
    private String precedent;

}
