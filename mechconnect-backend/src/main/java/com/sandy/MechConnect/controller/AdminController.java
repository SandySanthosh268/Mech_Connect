package com.sandy.MechConnect.controller;

import com.sandy.MechConnect.entity.Admin;
import com.sandy.MechConnect.entity.Customer;
import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.entity.Booking;
import com.sandy.MechConnect.entity.Review;
import com.sandy.MechConnect.repository.AdminRepository;
import com.sandy.MechConnect.repository.CustomerRepository;
import com.sandy.MechConnect.repository.MechanicRepository;
import com.sandy.MechConnect.repository.BookingRepository;
import com.sandy.MechConnect.repository.ReviewRepository;
import com.sandy.MechConnect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private MechanicRepository mechanicRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // --- Helper: Check if requester is admin ---
    private boolean isAdmin(String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        Optional<Admin> adminOpt = adminRepo.findByEmail(email);
        return adminOpt.isPresent();
    }

    // --- Customer Management ---
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(customerRepo.findAll());
    }

    @PutMapping("/customers/status/{id}")
    public ResponseEntity<?> updateCustomerStatus(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable Long id,
                                                  @RequestParam boolean active) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Optional<Customer> customerOpt = customerRepo.findById(id);
        if (customerOpt.isEmpty()) return ResponseEntity.badRequest().body("Customer not found");

        Customer customer = customerOpt.get();
        customer.setActive(active); // Make sure Customer entity has 'active' field
        customerRepo.save(customer);
        return ResponseEntity.ok(customer);
    }

    // --- Mechanic Management ---
    @GetMapping("/mechanics")
    public ResponseEntity<List<Mechanic>> getAllMechanics(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(mechanicRepo.findAll());
    }

    @PutMapping("/mechanics/status/{id}")
    public ResponseEntity<?> updateMechanicStatus(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable Long id,
                                                  @RequestParam boolean approved) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Optional<Mechanic> mechanicOpt = mechanicRepo.findById(id);
        if (mechanicOpt.isEmpty()) return ResponseEntity.badRequest().body("Mechanic not found");

        Mechanic mechanic = mechanicOpt.get();
        mechanic.setStatus(approved ? "APPROVED" : "REJECTED"); // Make sure Mechanic entity has 'status' field
        mechanicRepo.save(mechanic);
        return ResponseEntity.ok(mechanic);
    }

    // --- Booking Management ---
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(bookingRepo.findAll());
    }

    // --- Reviews Management ---
    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@RequestHeader("Authorization") String authHeader) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(reviewRepo.findAll());
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<?> deleteReview(@RequestHeader("Authorization") String authHeader,
                                          @PathVariable Long id) {
        if (!isAdmin(authHeader)) return ResponseEntity.status(403).build();

        Optional<Review> reviewOpt = reviewRepo.findById(id);
        if (reviewOpt.isEmpty()) return ResponseEntity.badRequest().body("Review not found");

        reviewRepo.delete(reviewOpt.get());
        return ResponseEntity.ok("Review deleted");
    }

    // Optional: Reports & Analytics (Bookings per day, top-rated mechanics, etc.)
}
