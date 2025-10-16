package com.sandy.MechConnect.repository;

import com.sandy.MechConnect.entity.Booking;
import com.sandy.MechConnect.entity.Customer;
import com.sandy.MechConnect.entity.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(Customer customer);
    List<Booking> findByMechanic(Mechanic mechanic);
}
