package com.semo.university.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScoreStatistics {

    private Integer lowestScore;
    private String lowestScoreName;

    private Integer highestScore;
    private String highestScoreName;

    private Double averageScore;

}
