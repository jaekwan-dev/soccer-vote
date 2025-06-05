package com.example.soccervote.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String stadium;

    @Column(nullable = false)
    private LocalDateTime matchDate;

    @Column(nullable = false)
    private LocalDateTime voteEndTime;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public LocalDateTime getVoteEndTime() {
        return voteEndTime;
    }

    public void setVoteEndTime(LocalDateTime voteEndTime) {
        this.voteEndTime = voteEndTime;
    }
} 