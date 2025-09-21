package com.springboot.campusmanagementbackend.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Student {
    @Id
    private String id;
    private String email;
    private String password;

    @OneToMany(mappedBy = "studentId", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Complaints> complaints;
}
