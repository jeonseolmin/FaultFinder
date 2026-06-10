package com.team2.faultFind_backend.accident.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class AccidentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String category;

    @Column(name = "case_code", nullable = false, unique = true)
    private String caseCode;

    @Column(nullable = false)
    private String title;

    @Column(name = "party_a_name", nullable = false)
    private String partyAName;

    @Column(name = "party_b_name", nullable = false)
    private String partyBName;

    @Column(name = "base_fault_a", nullable = false)
    private int baseFaultA;

    @Column(name = "base_fault_b", nullable = false)
    private int baseFaultB;

    @Builder
    public AccidentEntity(String category, String caseCode, String title, String partyAName, String partyBName, int baseFaultA, int baseFaultB) {
        this.category = category;
        this.caseCode = caseCode;
        this.title = title;
        this.partyAName = partyAName;
        this.partyBName = partyBName;
        this.baseFaultA = baseFaultA;
        this.baseFaultB = baseFaultB;
    }
}