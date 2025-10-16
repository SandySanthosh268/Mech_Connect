package com.sandy.MechConnect.controller;

import com.sandy.MechConnect.entity.Customer;
import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.entity.Admin;
import com.sandy.MechConnect.repository.CustomerRepository;
import com.sandy.MechConnect.repository.MechanicRepository;
import com.sandy.MechConnect.repository.AdminRepository;
import com.sandy.MechConnect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

//@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private MechanicRepository mechanicRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Customer Registration
    @PostMapping("/register/customer")
    public ResponseEntity<Customer> registerCustomer(@RequestBody Customer customer) {
        Customer saved = customerRepo.save(customer);
        return ResponseEntity.ok(saved);
    }

    // 🔹 Mechanic Registration
    @PostMapping("/register/mechanic")
    public ResponseEntity<Mechanic> registerMechanic(@RequestBody Mechanic mechanic) {
        Mechanic saved = mechanicRepo.save(mechanic);
        return ResponseEntity.ok(saved);
    }

    // 🔹 Admin Registration (Optional)
    @PostMapping("/register/admin")
    public ResponseEntity<Admin> registerAdmin(@RequestBody Admin admin) {
        Admin saved = adminRepo.save(admin);
        return ResponseEntity.ok(saved);
    }

    // 🔹 Login with JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        // Customer Login
        Optional<Customer> customer = customerRepo.findByEmailAndPassword(email, password);
        if (customer.isPresent()) {
            String token = jwtUtil.generateToken(email, "CUSTOMER");
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }

        // Mechanic Login
        Optional<Mechanic> mechanic = mechanicRepo.findByEmailAndPassword(email, password);
        if (mechanic.isPresent()) {
            String token = jwtUtil.generateToken(email, "MECHANIC");
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }

        // Admin Login
        Optional<Admin> admin = adminRepo.findByEmailAndPassword(email, password);
        if (admin.isPresent()) {
            String token = jwtUtil.generateToken(email, "ADMIN");
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }

        return ResponseEntity.status(401).body("❌ Invalid Credentials");
    }
}
