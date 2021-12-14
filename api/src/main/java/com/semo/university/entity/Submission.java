package com.semo.university.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Student student;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Activity activity;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Course course;

    private String document;

    private Integer score;

}
