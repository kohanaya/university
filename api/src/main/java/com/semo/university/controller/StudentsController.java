package com.semo.university.controller;

import com.semo.university.entity.Student;
import com.semo.university.repository.StudentRepository;
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
public class StudentsController {

    private final StudentRepository studentRepository;

    @PostMapping("/students")
    public Student create(@RequestBody Student newStudent) {
        newStudent.setId(null);
        return studentRepository.save(newStudent);
    }

    @GetMapping("/students")
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @GetMapping("/students/{id}")
    public Optional<Student> getById(@PathVariable Long id) {
        return studentRepository.findById(id);
    }

    @PutMapping("/students/{id}")
    public Student update(@PathVariable Long id,
                          @RequestBody Student newData) {
        var model = studentRepository.findById(id).orElseThrow();
        model.setFullName(newData.getFullName());
        model.setAddress(newData.getAddress());
        return studentRepository.save(model);
    }

    @DeleteMapping("/students/{id}")
    public void delete(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }

}
