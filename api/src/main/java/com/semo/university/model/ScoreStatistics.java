package com.semo.university.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreStatistics {

    private Double lowestScore;
    private String lowestScoreName;

    private Double highestScore;
    private String highestScoreName;

    private Double averageScore;

}
