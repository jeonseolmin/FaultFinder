package com.team2.faultFind_backend.accidentdetail.repository;
import com.team2.faultFind_backend.accidentdetail.entity.AccidentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccidentDetailsRepository extends JpaRepository<AccidentDetails, Long> {
    Optional<AccidentDetails> findByCaseCode(String caseCode);
=======

public interface AccidentDetailsRepository extends JpaRepository<AccidentDetails, Long> {

>>>>>>> 53a12256c8996c5ba4aa0b2404a7f1b1063776d8
}

