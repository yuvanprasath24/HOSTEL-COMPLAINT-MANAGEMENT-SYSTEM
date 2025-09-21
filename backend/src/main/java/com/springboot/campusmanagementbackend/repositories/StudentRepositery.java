package com.springboot.campusmanagementbackend.repositories;

import com.springboot.campusmanagementbackend.dto.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepositery extends JpaRepository<Student, Integer> {
    Student findByEmail(String email);
}
