package com.springboot.campusmanagementbackend.repositories;

import com.springboot.campusmanagementbackend.dto.Complaints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintsRepositery extends JpaRepository<Complaints, Integer> {
}
