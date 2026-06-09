package com.team2.legal_qna_backend.fault;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class FaultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "case_code", nullable = false)
    private String caseCode;

    @Column(name = "modifier_name", nullable = false)
    private String modifierName;

    @Column(name = "change_value", nullable = false)
    private int changeValue;

    @Builder
    public FaultEntity(String caseCode, String modifierName, int changeValue) {
        this.caseCode = caseCode;
        this.modifierName = modifierName;
        this.changeValue = changeValue;
    }
}