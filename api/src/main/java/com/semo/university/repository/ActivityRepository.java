package com.semo.university.repository;

import com.semo.university.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByCourseId(Long courseId);

    List<Activity> findAllByCourseIdAndDueDateIsBefore(Long courseId, Instant now);

}
