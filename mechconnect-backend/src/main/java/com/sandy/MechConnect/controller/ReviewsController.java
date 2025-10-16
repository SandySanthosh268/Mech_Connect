package com.sandy.MechConnect.controller;

import com.sandy.MechConnect.entity.Customer;
import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.entity.Review;
import com.sandy.MechConnect.repository.CustomerRepository;
import com.sandy.MechConnect.repository.MechanicRepository;
import com.sandy.MechConnect.repository.ReviewRepository;
import com.sandy.MechConnect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {
    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private MechanicRepository mechanicRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // Customer creates review
    @PostMapping("/create")
    public ResponseEntity<?> createReview(@RequestHeader("Authorization") String authHeader,
                                          @RequestParam Long mechanicId,
                                          @RequestParam int rating,
                                          @RequestParam String comment) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        Optional<Customer> customerOpt = customerRepo.findByEmail(email);
        Optional<Mechanic> mechanicOpt = mechanicRepo.findById(mechanicId);

        if (customerOpt.isEmpty() || mechanicOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Customer or Mechanic");
        }

        Review review = new Review();
        review.setCustomer(customerOpt.get());
        review.setMechanic(mechanicOpt.get());
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(LocalDateTime.now());

        Review saved = reviewRepo.save(review);
        return ResponseEntity.ok(saved);
    }

    // Get reviews for a mechanic
    @GetMapping("/mechanic/{id}")
    public ResponseEntity<List<Review>> getMechanicReviews(@PathVariable Long id) {
        Optional<Mechanic> mechanicOpt = mechanicRepo.findById(id);
        if (mechanicOpt.isEmpty()) return ResponseEntity.badRequest().build();

        List<Review> reviews = reviewRepo.findByMechanic(mechanicOpt.get());
        return ResponseEntity.ok(reviews);
    }
}
