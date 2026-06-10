package com.team2.faultFind_backend.fault.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "fault_modifiers" )
@NoArgsConstructor
public class Fault {

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
    public Fault(String caseCode, String modifierName, int changeValue) {
        this.caseCode = caseCode;
        this.modifierName = modifierName;
        this.changeValue = changeValue;
    }
}