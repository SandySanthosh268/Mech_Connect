package com.sandy.MechConnect.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.sandy.MechConnect.entity.Booking;
import com.sandy.MechConnect.repository.BookingRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private RazorpayClient client;

    @Autowired
    private BookingRepository bookingRepo;

    // Initialize Razorpay client
    public PaymentController() throws RazorpayException {
        String key = "YOUR_RAZORPAY_KEY";
        String secret = "YOUR_RAZORPAY_SECRET";
        this.client = new RazorpayClient(key, secret);
    }

    // Create Order
    @PostMapping("/createOrder")
    public String createOrder(@RequestParam Long bookingId, @RequestParam int amount) throws RazorpayException {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if (booking == null) return "Booking not found";

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // amount in paise
        options.put("currency", "INR");
        options.put("receipt", "order_rcptid_" + bookingId);

        Order order = client.Orders.create(options);

        // Save Razorpay order ID in booking for reference (optional)
        booking.setPaymentOrderId(order.get("id"));
        bookingRepo.save(booking);

        return order.toString();
    }

    // Payment success callback (called from frontend)
    @PostMapping("/paymentSuccess")
    public String paymentSuccess(@RequestParam Long bookingId, @RequestParam String razorpayPaymentId) {
        Booking booking = bookingRepo.findById(bookingId).orElse(null);
        if (booking == null) return "Booking not found";

        booking.setPaymentId(razorpayPaymentId);
        booking.setStatus("PAID"); // or COMPLETED if service is done
        bookingRepo.save(booking);

        return "Payment successful for booking: " + bookingId;
    }
}
