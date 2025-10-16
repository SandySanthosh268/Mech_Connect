package com.sandy.MechConnect.controller;

import com.sandy.MechConnect.entity.Booking;
import com.sandy.MechConnect.entity.Customer;
import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.repository.BookingRepository;
import com.sandy.MechConnect.repository.CustomerRepository;
import com.sandy.MechConnect.repository.MechanicRepository;
import com.sandy.MechConnect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private MechanicRepository mechanicRepo;

    @Autowired
    private JwtUtil jwtUtil;

    // Customer creates a booking
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestHeader("Authorization") String authHeader,
                                           @RequestParam Long mechanicId,
                                           @RequestParam String serviceType) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        Optional<Customer> customerOpt = customerRepo.findByEmail(email);
        Optional<Mechanic> mechanicOpt = mechanicRepo.findById(mechanicId);

        if (customerOpt.isEmpty() || mechanicOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Customer or Mechanic");
        }

        Booking booking = new Booking();
        booking.setCustomer(customerOpt.get());
        booking.setMechanic(mechanicOpt.get());
        booking.setServiceType(serviceType);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStatus("REQUESTED");

        Booking saved = bookingRepo.save(booking);
        return ResponseEntity.ok(saved);
    }

    // Get bookings for logged-in customer
    @GetMapping("/customer")
    public ResponseEntity<List<Booking>> getCustomerBookings(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        Optional<Customer> customerOpt = customerRepo.findByEmail(email);
        if (customerOpt.isEmpty()) return ResponseEntity.badRequest().build();

        List<Booking> bookings = bookingRepo.findByCustomer(customerOpt.get());
        return ResponseEntity.ok(bookings);
    }

    // Get bookings for logged-in mechanic
    @GetMapping("/mechanic")
    public ResponseEntity<List<Booking>> getMechanicBookings(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        Optional<Mechanic> mechanicOpt = mechanicRepo.findByEmail(email);
        if (mechanicOpt.isEmpty()) return ResponseEntity.badRequest().build();

        List<Booking> bookings = bookingRepo.findByMechanic(mechanicOpt.get());
        return ResponseEntity.ok(bookings);
    }

    // Mechanic updates booking status
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id,
                                                 @RequestParam String status) {
        Optional<Booking> bookingOpt = bookingRepo.findById(id);
        if (bookingOpt.isEmpty()) return ResponseEntity.badRequest().body("Booking not found");

        Booking booking = bookingOpt.get();
        booking.setStatus(status);
        Booking updated = bookingRepo.save(booking);
        return ResponseEntity.ok(updated);
    }
}
