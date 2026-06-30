package com.team2.faultFind_backend.post.repository;

import com.team2.faultFind_backend.post.entity.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostFileRepository extends JpaRepository<PostFile, Long> {
}