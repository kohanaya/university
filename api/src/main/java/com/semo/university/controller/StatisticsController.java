package com.semo.university.controller;

import com.semo.university.entity.Submission;
import com.semo.university.model.ScoreStatistics;
import com.semo.university.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.util.Precision;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class StatisticsController {

    private final SubmissionRepository submissionRepository;

    @GetMapping("/courses/{courseId}/scores")
    public ScoreStatistics getScore(@PathVariable Long courseId) {
        List<Submission> submissions = submissionRepository.findAllByCourseId(courseId);
        if (submissions.isEmpty()) {
            return ScoreStatistics.builder().build();
        }
        Double sum = 0d;
        Integer lowestScore = Integer.MAX_VALUE;
        String lowestName = "-";
        Integer highestScore = 0;
        String highestName = "-";
        for (var submission : submissions) {
            sum += submission.getScore();
            if (submission.getScore() < lowestScore) {
                lowestScore = submission.getScore();
                lowestName = submission.getStudent().getFullName();
            }
            if (submission.getScore() > highestScore) {
                highestScore = submission.getScore();
                highestName = submission.getStudent().getFullName();
            }
        }
        return ScoreStatistics.builder()
                .averageScore(Precision.round(sum / submissions.size(), 2))
                .lowestScoreName(lowestName)
                .lowestScore(lowestScore)
                .highestScoreName(highestName)
                .highestScore(highestScore)
                .build();
    }

}
