package com.accomodation.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ApartmentPostRequest {

  @NotBlank
  private String apartmentName;

  private String apartmentDesc;

  private String apartmentPic;

  @NotBlank
  private String apartmentLoc;

  private Integer rooms;

  private Integer bathrooms;

  private Integer kitchen;

  private String amenities;

  private String area;

  @NotBlank
  private String rent;

  private String securityDeposit;

  private LocalDate availableFrom;

  private LocalDate availableTill;
}
