package com.semo.university.controller;

import com.semo.university.model.ScoreStatistics;
import com.semo.university.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class StatisticsController {

    private final ActivityRepository activityRepository;

    @GetMapping("/courses/{courseId}/scores")
    public ScoreStatistics getScore() {
        return ScoreStatistics.builder()
                .averageScore(2.4)
                .lowestScore(1.0)
                .lowestScoreName("Kirsten Rivera")
                .highestScore(4.0)
                .highestScoreName("Kirsten Rivera")
                .build();
    }

}
