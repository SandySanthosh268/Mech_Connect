package com.sandy.MechConnect.repository;

import com.sandy.MechConnect.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email); // <-- Add this line

    Optional<Admin> findByEmailAndPassword(String email, String password); // For login
}
