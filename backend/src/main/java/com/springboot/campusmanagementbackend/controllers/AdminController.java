package com.springboot.campusmanagementbackend.controllers;

import com.springboot.campusmanagementbackend.dto.Admin;
import com.springboot.campusmanagementbackend.dto.Complaints;
import com.springboot.campusmanagementbackend.services.AdminService;
import com.springboot.campusmanagementbackend.services.ComplaintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ComplaintsService complaintsService;

    @PostMapping("/adminRegister")
    public int createAdmin(@RequestBody Admin admin) {
        int bool = adminService.createAdmin(admin);
        return bool;
    }

    @PostMapping("/adminLoginVerify")
    public int adminVerify(@RequestBody Admin admin) {
        int bool = adminService.verifyAdmin(admin);
        return bool;
    }

    @GetMapping("/fetchAllComplaints")
    public List<Complaints> getAllComplaints(){
        return complaintsService.getAllComplaints();
    }

    @PutMapping("/updateComplaintStatus")
    public int updateComplaints(@RequestBody Complaints complaints) {
        int bool = complaintsService.updateComplaint(complaints);
        return bool;
    }

}
