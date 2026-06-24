package com.team2.faultFind_backend.accidentdetail.entity;

import com.team2.faultFind_backend.accident.entity.Accident;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "case_code",
            referencedColumnName = "case_code",
            insertable = false,
            updatable = false
    )
    private Accident accident;

    @Column(name="accident_situation" , columnDefinition = "TEXT")
    private String accidentSituation;

    @Column(name="base_fault_explanation", columnDefinition = "TEXT")
    private String baseFaultExplanation;

    @Column(name="modifier_explanation", columnDefinition = "TEXT")
    private String modifierExplanation;

    @Column(name="legal_reference", columnDefinition = "TEXT")
    private String legalReference;
}
