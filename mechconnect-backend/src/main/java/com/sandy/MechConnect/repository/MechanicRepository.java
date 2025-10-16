package com.sandy.MechConnect.repository;

import com.sandy.MechConnect.entity.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MechanicRepository extends JpaRepository<Mechanic, Long> {

    Optional<Mechanic> findByEmail(String email);

    Optional<Mechanic> findByEmailAndPassword(String email, String password);

    // Custom search query
    @Query("SELECT m FROM Mechanic m WHERE " +
            "(:serviceType IS NULL OR m.serviceType LIKE %:serviceType%) AND " +
            "(:location IS NULL OR m.location LIKE %:location%) AND " +
            "(:minRating IS NULL OR m.rating >= :minRating) AND " +
            "(:maxPrice IS NULL OR m.price <= :maxPrice) AND " +
            "m.status = 'APPROVED'")
    List<Mechanic> searchMechanics(@Param("serviceType") String serviceType,
                                   @Param("location") String location,
                                   @Param("minRating") Double minRating,
                                   @Param("maxPrice") Double maxPrice);
}
