package com.springboot.campusmanagementbackend.controllers;

import com.springboot.campusmanagementbackend.dto.Admin;
import com.springboot.campusmanagementbackend.dto.Complaints;
import com.springboot.campusmanagementbackend.dto.Student;
import com.springboot.campusmanagementbackend.services.ComplaintsService;
import com.springboot.campusmanagementbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ComplaintsService complaintsService;

    @PostMapping("/studentDetails")
    public int createStudent(@RequestBody Student student) {
        int bool = studentService.createStudent(student);
        return bool;
    }

    @PostMapping("/studentVerify")
    public int adminVerify(@RequestBody Student student) {
        int bool = studentService.verifyStudent(student);
        return bool;
    }

    @PostMapping("/registerComplaint")
    public int registerComplaint(@RequestBody Complaints complaints ) {
        int bool = complaintsService.registerComplaint(complaints);
        return bool;
    }
}
