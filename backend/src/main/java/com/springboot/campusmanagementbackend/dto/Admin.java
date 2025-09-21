package com.springboot.campusmanagementbackend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Admin {
    @Id
    private String id;
    private String email;
    private String password;
}
