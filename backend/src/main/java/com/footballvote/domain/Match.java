package com.footballvote.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("match")
    private List<Vote> votes = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 