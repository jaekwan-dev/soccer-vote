package com.footballvote.controller;

import com.footballvote.domain.Stadium;
import com.footballvote.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stadiums")
@CrossOrigin(origins = "http://localhost:3000")
public class StadiumController {

    @Autowired
    private StadiumRepository stadiumRepository;

    @GetMapping
    public ResponseEntity<List<Stadium>> getAllStadiums() {
        return ResponseEntity.ok(stadiumRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Stadium> createStadium(@RequestBody Stadium stadium) {
        return ResponseEntity.ok(stadiumRepository.save(stadium));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStadium(@PathVariable Long id) {
        stadiumRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
} 