package com.example.soccervote.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.soccervote.model.Match;
import com.example.soccervote.repository.MatchRepository;
import com.example.soccervote.repository.VoteRepository;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private VoteRepository voteRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    @Transactional
    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    @Transactional
    public void deleteMatch(Long id) {
        Match match = matchRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("경기를 찾을 수 없습니다."));
        
        // 해당 경기의 모든 투표 삭제
        voteRepository.deleteByMatchId(id);
        
        // 경기 삭제
        matchRepository.delete(match);
    }
} 