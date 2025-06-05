package com.footballvote.repository;

import com.footballvote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findByMatchId(Long matchId);
} 