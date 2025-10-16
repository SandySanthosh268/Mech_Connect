package com.sandy.MechConnect.repository;

import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMechanic(Mechanic mechanic);
}
