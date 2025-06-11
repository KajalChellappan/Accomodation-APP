package com.accomodation.app.controller;

import com.accomodation.app.dto.ApartmentPostRequest;
import com.accomodation.app.dto.ForgotPasswordRequest;
import com.accomodation.app.dto.LoginRequest;
import com.accomodation.app.dto.RegisterRequest;
import com.accomodation.app.model.ApartmentPost;
import com.accomodation.app.service.ApartmentPostService;
import com.accomodation.app.service.AuthService;
import jakarta.validation.Valid;
import jdk.jfr.Registered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

  @Autowired
  private AuthService authService;

  @Autowired
  private ApartmentPostService apartmentPostService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

    authService.register(request);
    return ResponseEntity.ok(Map.of("message", "User registered successfully"));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    var response = authService.login(request);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/forgotPassword")
  public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    authService.forgotPassword(request);
    return ResponseEntity.ok("If your email exists, you will get reset instructions");
  }

  @PostMapping("/updatePassword")
  public ResponseEntity<?> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
    authService.updatePassword(email, newPassword);
    return ResponseEntity.ok("Password updated successfully");
  }

  @PostMapping("/postApartment")
  public ResponseEntity<?> postApartment(@Valid @RequestBody ApartmentPostRequest request) {
    ApartmentPost post = apartmentPostService.postApartment(request);
    return ResponseEntity.ok(post);
  }

  @GetMapping("/test")
  public ResponseEntity<?> test() {
    return ResponseEntity.ok("test success");
  }

}
