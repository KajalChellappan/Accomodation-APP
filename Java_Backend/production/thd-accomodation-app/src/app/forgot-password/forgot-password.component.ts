import { Component, Inject } from '@angular/core'; // removed OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { of } from 'rxjs';

// for PasswordDialog
export interface DialogData {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
  });
  showErrorMessage = false;
  isSubmitted = false;
  // form element values
  email: string = '';

  // Data from register form
  password: string = '';
  confirmPassword: string = '';

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  OnChangePassword() {
    this.jwtService.verifyEmail(this.email).subscribe(
      (res) => {
        console.log('response from verify email' + res);
        if (res.message == 'Vaild User') {
          this.showErrorMessage = false;
          console.log(this.email);
          this.openDialog(this.email);
        } else {
          console.log(res);
        }
      },
      (error) => {
        this.showErrorMessage = true;
      }
    );
  }

  openDialog(email: string): void {
    console.log(email);
    const dialogRef = this.dialog.open(PasswordDialog, {
      width: '400px',
      height: '400px',
      // input data empty at first
      data: {
        email: email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
    });

    // dialogRef.afterClosed().subscribe((data) => {
    //   console.log('dialogRef.afterClosed data: ');
    //   console.log(data);
    //   console.log('dialogRef.componentInstance.data');
    //   console.log(dialogRef.componentInstance.data);

    //   // this.jwtService.changePassword(data).subscribe((res: any) => {
    //   //   console.log('password updated response: ' + res);
    //   //   if (res.message == 'password Successfully Updated') {
    //   //     this.router.navigateByUrl('/login');
    //   //   } else {
    //   //     console.log('The password update failed');
    //   //   }
    //   // });
    // });
  }
}
@Component({
  selector: 'password-dialog',
  templateUrl: 'password-dialog.html',
})
export class PasswordDialog {
  constructor(
    // private injector: Injector
    public dialogRef: MatDialogRef<PasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private jwtService: JwtService
  ) {}
  onConfirmClick(): void {
    this.jwtService.changePassword(this.data).subscribe((res: any) => {
      console.log('password updated response: ' + res);
      if (res.message == 'password Successfully Updated') {
        this.router.navigateByUrl('/login');
      } else {
        console.log('The password update failed');
      }
      this.dialogRef.close();
    });
  }
}
