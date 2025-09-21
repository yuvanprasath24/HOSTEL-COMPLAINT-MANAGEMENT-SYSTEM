package com.springboot.campusmanagementbackend.services;

import com.springboot.campusmanagementbackend.dto.Admin;
import com.springboot.campusmanagementbackend.repositories.AdminRepositery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepositery adminRepositery;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public int createAdmin(Admin admin) {
        String password = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(password);
        Admin savedAdmin = adminRepositery.save(admin);
        if(savedAdmin != null) {
            return 1;
        } else
            return 0;
    }

    public int verifyAdmin(Admin admin) {
        Admin adminFetched = adminRepositery.findByEmail(admin.getEmail());
        if(adminFetched != null && passwordEncoder.matches(admin.getPassword(), adminFetched.getPassword())) {
            return 1;
        }
        else{
            return 0;
        }
    }
}
