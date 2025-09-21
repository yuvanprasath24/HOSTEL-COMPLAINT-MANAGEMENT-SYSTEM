package com.springboot.campusmanagementbackend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.springboot.campusmanagementbackend.enums.ComplaintStatus;
import com.springboot.campusmanagementbackend.enums.ComplaintTypes;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Complaints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonBackReference
    private Student studentId;

    @Enumerated(EnumType.STRING)
    private ComplaintTypes complaintType;
    private String complaintSubject;
    private String complaintDescription;
    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;
}
