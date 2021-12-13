package com.semo.university.controller;

import com.semo.university.entity.Course;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class CoursesController {

    private final CourseRepository classRepository;

    @PostMapping("/courses")
    public Course create(@RequestBody Course course) {
        course.setId(null);
        return classRepository.save(course);
    }

    @GetMapping("/courses")
    public List<Course> getAll() {
        return classRepository.findAll();
    }

    @GetMapping("/courses/{id}")
    public Optional<Course> getById(@PathVariable Long id) {
        return classRepository.findById(id);
    }

    @PutMapping("/courses/{id}")
    public Course update(@PathVariable Long id,
                         @RequestBody Course newCourse) {
        var course = classRepository.findById(id).orElseThrow();
        course.setNumber(newCourse.getNumber());
        course.setName(newCourse.getName());
        course.setLocation(newCourse.getLocation());
        course.setTime(newCourse.getTime());
        return classRepository.save(course);
    }

    @DeleteMapping("/courses/{id}")
    public void delete(@PathVariable Long id) {
        classRepository.deleteById(id);
    }

}
