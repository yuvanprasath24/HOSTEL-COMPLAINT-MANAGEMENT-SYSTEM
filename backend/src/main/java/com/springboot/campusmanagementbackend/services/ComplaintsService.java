package com.springboot.campusmanagementbackend.services;

import com.springboot.campusmanagementbackend.dto.Complaints;
import com.springboot.campusmanagementbackend.repositories.ComplaintsRepositery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintsService {

    @Autowired
    private ComplaintsRepositery complaintsRepositery;

    public int registerComplaint(Complaints complaints ){
        Complaints savedComplaints = complaintsRepositery.save(complaints);
        if(savedComplaints != null){
            return 1;
        }
        else{
            return 0;
        }
    }

    public List<Complaints> getAllComplaints() {
        return complaintsRepositery.findAll();
    }

    public int updateComplaint(Complaints complaints) {
        Complaints savedComplaints = complaintsRepositery.save(complaints);
        if(savedComplaints != null){
            return 1;
        }
        else{
            return 0;
        }
    }
}
