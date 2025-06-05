package com.footballvote.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class MatchRequest {
    private String stadium;
    private LocalDateTime matchDate;
    private LocalDateTime voteEndTime;
} 