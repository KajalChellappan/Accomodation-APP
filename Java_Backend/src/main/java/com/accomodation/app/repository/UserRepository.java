package com.accomodation.app.repository;

import com.accomodation.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  Optional<User> findByUsername(String username);
  boolean existsByEmail(String email);
  boolean existsByUsername(String username);
  Optional<User> findTopByOrderByUniqueIdDesc();
}
