package com.accomodation.app.service;

import com.accomodation.app.dto.ForgotPasswordRequest;
import com.accomodation.app.dto.LoginRequest;
import com.accomodation.app.dto.RegisterRequest;
import com.accomodation.app.exception.CustomException;
import com.accomodation.app.model.User;
import com.accomodation.app.repository.UserRepository;
import com.accomodation.app.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.RsaSecretEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtProvider jwtProvider;

  public void register(RegisterRequest request){
    if(userRepository.existsByUsername(request.getUsername())) {
      throw new CustomException("Username already exists", 403);
    }

    if(userRepository.existsByEmail(request.getEmail())){
      throw new CustomException("Email already exists", 403);
    }

    Integer newUniqueId = userRepository.findTopByOrderByUniqueIdDesc()
      .map(user -> user.getUniqueId() + 1)
      .orElse(1);

    User user = new User();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setUniqueId(newUniqueId);
    userRepository.save(user);
  }

  public Map<String, Object> login(LoginRequest request){
    User user = userRepository.findByEmail(request.getEmail())
      .orElseThrow(() -> new CustomException("Invalid Credentials", 403));
    if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new CustomException("Invalid Credentials", 403);
    }

    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    claims.put("email", user.getEmail());
    claims.put("username", user.getUsername());

    String token = jwtProvider.generateToken(claims, 10 * 60 * 1000);
    String refreshToken = jwtProvider.generateToken(claims, 24 * 60 * 60 * 1000);

    Map<String, Object> response =  new HashMap<>();
    response.put("token", token);
    response.put("refreshToken", refreshToken);
    response.put("user", user);

    return response;
  }

  public void forgotPassword(ForgotPasswordRequest request) {
    if(!userRepository.existsByEmail(request.getEmail())){
      throw new CustomException("Email not found", 404);
    }
  }

  public void updatePassword(String email, String newPassword) {
    User user = userRepository.findByEmail(email)
      .orElseThrow(() -> new CustomException("User not found", 404));
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }
}
