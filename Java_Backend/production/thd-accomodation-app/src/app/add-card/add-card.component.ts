import { adminform } from './../adminForm';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  name: string = '';
  addCardForm: FormGroup = this.formBuilder.group({
    apartmentName: ['', Validators.required],
    apartmentDesc: [''],
    apartmentPic: [''],
    apartmentLoc: [''],
    rooms: [''],
    bathrooms: [''],
    kitchen: [''],
    amenities: [''],
    area: [''],
    rent: [''],
    securityDeposit: [''],
    availableFrom: [''],
    availableTill: [''],
  });
  isSubmitted = false;
  // form element values
  apartmentName: string = '';
  apartmentDesc: string = '';
  apartmentLoc: string = '';
  rooms: number = 0;
  bathrooms: number = 0;
  kitchen: number = 0;
  amenities: string = '';
  area: string = '';
  rent: string = '';
  securityDeposit: string = '';

  get formControls() {
    return this.addCardForm.controls;
  }

  file: any;
  getName(name: string) {
    this.name = name;
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file);
  }

  addCard(adminform: adminform) {
    this.isSubmitted = true;
    if (this.addCardForm.invalid) {
      return;
    }
    this.jwtService.addCardData(adminform);
  }
  moveToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
