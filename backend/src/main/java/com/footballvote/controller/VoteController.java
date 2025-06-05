package com.footballvote.controller;

import com.footballvote.domain.Match;
import com.footballvote.domain.Vote;
import com.footballvote.dto.VoteRequest;
import com.footballvote.repository.MatchRepository;
import com.footballvote.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin(origins = "http://localhost:3000")
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private MatchRepository matchRepository;

    @PostMapping("/{matchId}/votes")
    public ResponseEntity<?> createVote(
            @PathVariable Long matchId,
            @RequestBody VoteRequest voteRequest) {
        
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("경기를 찾을 수 없습니다."));

        // 투표 마감 시간 체크
        if (LocalDateTime.now().isAfter(match.getVoteEndTime())) {
            return ResponseEntity.badRequest().body("투표가 마감되었습니다.");
        }

        // 이미 투표한 사용자인지 확인
        List<Vote> existingVotes = voteRepository.findByMatchId(matchId);
        boolean hasVoted = existingVotes.stream()
                .anyMatch(vote -> vote.getName().equals(voteRequest.getName()));
        
        if (hasVoted) {
            return ResponseEntity.badRequest().body("이미 투표하셨습니다.");
        }

        Vote vote = new Vote();
        vote.setMatch(match);
        vote.setName(voteRequest.getName());
        vote.setAttending(voteRequest.isAttending());

        return ResponseEntity.ok(voteRepository.save(vote));
    }

    @GetMapping("/{matchId}/votes")
    public ResponseEntity<List<Vote>> getVotes(@PathVariable Long matchId) {
        return ResponseEntity.ok(voteRepository.findByMatchId(matchId));
    }
} 