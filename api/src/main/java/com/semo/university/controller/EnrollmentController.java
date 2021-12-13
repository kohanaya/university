package com.semo.university.controller;

import com.semo.university.entity.Enrollment;
import com.semo.university.entity.Student;
import com.semo.university.exception.NotFoundException;
import com.semo.university.repository.CourseRepository;
import com.semo.university.repository.EnrollmentRepository;
import com.semo.university.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

@SuppressWarnings("unused")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/courses/{courseId}")
public class EnrollmentController {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;

    @GetMapping("/enrollment")
    public List<Student> getAll(
            @PathVariable Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(NotFoundException::new)
                .getEnrolledStudents();
    }

    @PostMapping("/enrollment/students/{studentId}")
    public void create(
            @PathVariable Long courseId,
            @PathVariable Long studentId) {
        Enrollment e = new Enrollment();
        var course = courseRepository.findById(courseId).orElseThrow(NotFoundException::new);
        var student = studentRepository.findById(studentId).orElseThrow(NotFoundException::new);
        e.setCourse(course);
        e.setStudent(student);
        enrollmentRepository.save(e);
    }

    @DeleteMapping("/enrollment/students/{studentId}")
    public void unenroll(
            @PathVariable Long courseId,
            @PathVariable Long studentId) {
        var course = courseRepository.findById(courseId).orElseThrow(NotFoundException::new);
        var newList = course.getEnrolledStudents().stream()
                .filter(s -> !Objects.equals(s.getId(), studentId))
                .collect(toList());
        course.setEnrolledStudents(newList);
        courseRepository.save(course);
    }

}
