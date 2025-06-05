package com.example.soccervote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.soccervote.model.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    @Modifying
    @Query("DELETE FROM Vote v WHERE v.match.id = :matchId")
    void deleteByMatchId(Long matchId);
} 