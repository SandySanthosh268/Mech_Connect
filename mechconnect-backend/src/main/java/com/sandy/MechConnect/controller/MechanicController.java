package com.sandy.MechConnect.controller;

import com.sandy.MechConnect.entity.Mechanic;
import com.sandy.MechConnect.repository.MechanicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {

    @Autowired
    private MechanicRepository mechanicRepo;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMechanicProfile(
            @PathVariable Long id,
            @RequestBody Mechanic updated
    ) {
        return mechanicRepo.findById(id)
                .map(mechanic -> {

                    mechanic.setName(updated.getName());
                    mechanic.setSkill(updated.getSkill());
                    mechanic.setExperience(updated.getExperience());
                    mechanic.setServiceType(updated.getServiceType());
                    mechanic.setPrice(updated.getPrice());
                    mechanic.setLocation(updated.getLocation());

                    // ⭐ IMPORTANT LINE
                    mechanic.setProfileCompleted(true);

                    mechanicRepo.save(mechanic);
                    return ResponseEntity.ok(mechanic);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Search mechanics for customers
    @GetMapping("/search")
    public ResponseEntity<List<Mechanic>> searchMechanics(
            @RequestParam(required = false) String serviceType,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxPrice
    ) {
        List<Mechanic> mechanics = mechanicRepo.searchMechanics(serviceType, location, minRating, maxPrice);
        return ResponseEntity.ok(mechanics);
    }
}
