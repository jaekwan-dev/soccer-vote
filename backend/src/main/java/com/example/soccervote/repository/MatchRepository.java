package com.example.soccervote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.soccervote.model.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
} 