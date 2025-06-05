package com.footballvote.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteRequest {
    private String name;
    private boolean attending;
} 