package com.team2.faultFind_backend.accident.entity;


import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import com.team2.faultFind_backend.fault.entity.Fault;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Entity
@Table (name = "accident_cases")
@NoArgsConstructor
public class Accident {

    @Id
    @Column(name = "case_code")
    private String caseCode;

    @Column(nullable = false)
    private String category;

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

    @OneToMany(mappedBy = "accident")
    private List<Fault> modifiers;

    @OneToOne(mappedBy = "accident")
    private AccidentDetails detail;

    @Builder
    public Accident(String category, String caseCode, String title, String partyAName, String partyBName, int baseFaultA, int baseFaultB) {
        this.category = category;
        this.caseCode = caseCode;
        this.title = title;
        this.partyAName = partyAName;
        this.partyBName = partyBName;
        this.baseFaultA = baseFaultA;
        this.baseFaultB = baseFaultB;
    }
}