package com.semo.university.controller;

import com.semo.university.exception.NotFoundException;
import com.semo.university.entity.Activity;
import com.semo.university.repository.ActivityRepository;
import com.semo.university.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses/{courseId}")
public class ActivityController {

    private final CourseRepository courseRepository;
    private final ActivityRepository activityRepository;

    @PostMapping("/activities")
    public void create(
            @PathVariable Long courseId,
            @RequestBody Activity activity) {

        var course = courseRepository.findById(courseId).orElseThrow(NotFoundException::new);
        course.getActivities().add(activity);
        activity.setId(null);
        activity.setCourse(course);
        courseRepository.save(course);
    }

    @GetMapping("/activities")
    public List<Activity> getAll(
            @PathVariable Long courseId) {
        return activityRepository.findAllByCourseId(courseId);
    }

    @GetMapping("/activities/{id}")
    public Optional<Activity> getById(
            @PathVariable Long courseId,
            @PathVariable Long id) {
        return activityRepository.findById(id);
    }

    @PutMapping("/activities/{id}")
    public Activity update(
            @PathVariable Long courseId,
            @PathVariable Long id,
            @RequestBody Activity newActivity) {
        var activity = activityRepository.findById(id).orElseThrow();
        activity.setTitle(newActivity.getTitle());
        activity.setInstructions(newActivity.getInstructions());
        activity.setMaxPoints(newActivity.getMaxPoints());
        activity.setDueDate(newActivity.getDueDate());
        activity.setType(newActivity.getType());
        return activityRepository.save(activity);
    }

    @DeleteMapping("/activities/{id}")
    public void delete(
            @PathVariable Long courseId,
            @PathVariable Long id) {
        activityRepository.deleteById(id);
    }

}
