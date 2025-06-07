package com.accomodation.app.service;

import com.accomodation.app.dto.ApartmentPostRequest;
import com.accomodation.app.model.ApartmentPost;
import com.accomodation.app.repository.ApartmentPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ApartmentPostService {

  @Autowired
  private ApartmentPostRepository apartmentPostRepository;

  public ApartmentPost postApartment(ApartmentPostRequest request) {
    ApartmentPost post = new ApartmentPost();

    post.setApartmentName(request.getApartmentName());
    post.setApartmentDesc(request.getApartmentDesc());
    post.setApartmentPic(request.getApartmentPic());
    post.setApartmentLoc(request.getApartmentLoc());
    post.setRooms(request.getRooms());
    post.setBathrooms(request.getBathrooms());
    post.setKitchen(request.getKitchen());
    post.setAmenities(request.getAmenities());
    post.setArea(request.getArea());
    post.setApartmentRent(request.getRent());
    post.setCautionDeposit(request.getSecurityDeposit());
    post.setAvailableFrom(request.getAvailableFrom());
    post.setAvailableTill(request.getAvailableTill());

    return apartmentPostRepository.save(post);

  }
}
