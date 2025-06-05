package com.footballvote.repository;

import com.footballvote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    @Query("SELECT v FROM Vote v WHERE v.match.id = :matchId")
    List<Vote> findByMatchId(@Param("matchId") Long matchId);
} 