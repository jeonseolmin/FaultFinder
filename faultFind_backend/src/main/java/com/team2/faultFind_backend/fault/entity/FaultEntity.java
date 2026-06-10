<<<<<<< HEAD:faultFind_backend/src/main/java/com/team2/faultFind_backend/fault/FaultEntity.java
package com.team2.faultFind_backend.fault;
=======
package com.team2.faultFind_backend.fault.entity;
>>>>>>> 0af7a51220f8ecf975d9e1b4f71172e44d8c6f72:faultFind_backend/src/main/java/com/team2/faultFind_backend/fault/entity/FaultEntity.java

import jakarta.persistence.*;
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