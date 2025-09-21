package com.springboot.campusmanagementbackend.repositories;

import com.springboot.campusmanagementbackend.dto.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepositery extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);
}
