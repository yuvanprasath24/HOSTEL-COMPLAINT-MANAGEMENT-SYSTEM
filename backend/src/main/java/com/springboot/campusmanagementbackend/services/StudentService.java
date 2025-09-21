package com.springboot.campusmanagementbackend.services;

import com.springboot.campusmanagementbackend.dto.Admin;
import com.springboot.campusmanagementbackend.dto.Student;
import com.springboot.campusmanagementbackend.repositories.StudentRepositery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepositery studentRepositery;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public int createStudent(Student student) {
        String password = passwordEncoder.encode(student.getPassword());
        student.setPassword(password);
        Student savedStudent = studentRepositery.save(student);
        if(savedStudent != null) {
            return 1;
        } else
            return 0;
    }

    public int verifyStudent(Student student) {
        Student studentFetched = studentRepositery.findByEmail(student.getEmail());
        if(studentFetched != null && passwordEncoder.matches(student.getPassword(), studentFetched.getPassword())) {
            return 1;
        }
        else{
            return 0;
        }
    }
}
