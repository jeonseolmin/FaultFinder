package com.team2.faultFind_backend.accidentdetail.repository;
import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccidentDetailsRepository extends JpaRepository<AccidentDetails, Long> {
    Optional<AccidentDetails> findByCaseCode(String caseCode);

}

