package com.accomodation.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name= "postadvs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApartmentPost {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false)
  private String apartmentName;

  @NotBlank
  @Column(nullable = false)
  private String apartmentLoc;

  @NotBlank
  @Column(nullable = false)
  private String apartmentRent;

  @Column(nullable = false)
  private Integer apartmentArea;

  private String apartmentDesc;
  private String apartmentPic;
  private Integer rooms;
  private Integer bathrooms;
  private Integer kitchen;
  private String amenities;
  private String area;
  private String cautionDeposit;
  private LocalDate availableFrom;
  private LocalDate availableTill;

}
