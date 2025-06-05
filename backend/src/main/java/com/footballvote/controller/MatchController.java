package com.footballvote.controller;

import com.footballvote.domain.Match;
import com.footballvote.dto.MatchRequest;
import com.footballvote.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {

    @Autowired
    private MatchRepository matchRepository;

    @PostMapping
    public ResponseEntity<?> createMatch(@RequestBody MatchRequest request) {
        LocalDateTime now = LocalDateTime.now();

        if (request.getMatchDate().isBefore(now)) {
            return ResponseEntity.badRequest().body("경기 시간은 현재 시간 이후로 설정해야 합니다.");
        }

        if (request.getVoteEndTime().isBefore(now)) {
            return ResponseEntity.badRequest().body("마감시간은 현재 시간 이후로 설정해야 합니다.");
        }

        if (request.getVoteEndTime().isAfter(request.getMatchDate())) {
            return ResponseEntity.badRequest().body("마감시간은 경기 시간보다 이전이어야 합니다.");
        }

        Match match = new Match();
        match.setStadium(request.getStadium());
        match.setMatchDate(request.getMatchDate());
        match.setVoteEndTime(request.getVoteEndTime());
        
        return ResponseEntity.ok(matchRepository.save(match));
    }

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatches() {
        return ResponseEntity.ok(matchRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable Long id) {
        return matchRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 