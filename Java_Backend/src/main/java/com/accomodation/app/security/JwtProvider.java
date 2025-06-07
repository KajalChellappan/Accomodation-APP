package com.accomodation.app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtProvider {

  private KeyPair keyPair;

  @PostConstruct
  public void init() {
    keyPair = Keys.keyPairFor(SignatureAlgorithm.RS256);
  }

  public String generateToken(Map<String, Object> claims, long expirationMs) {
    Date now = new Date();
    Date expiryDate =  new Date(now.getTime() + expirationMs);

    return Jwts.builder()
      .setClaims(claims)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(getPrivateKey(), SignatureAlgorithm.RS256)
      .compact();
  }

  private PrivateKey getPrivateKey() {
     return keyPair.getPrivate();
  }

  public boolean validateToken(String token) {
    try {
       Jwts.parserBuilder()
         .setSigningKey(keyPair.getPublic())
         .build()
         .parseClaimsJws(token);
       return true;
    }catch (JwtException ex){
      return false;
    }
  }

  public Claims getClaims(String token) {
     return Jwts.parserBuilder()
       .setSigningKey(keyPair.getPublic())
       .build()
       .parseClaimsJws(token)
       .getBody();
  }
}
