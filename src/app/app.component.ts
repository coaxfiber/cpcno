import { Component } from '@angular/core';
import { GlobalService } from './global.service';

import { LoginComponent } from './login/login.component';
import {MatDialog} from '@angular/material';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aurasystem'; 
  constructor(public global: GlobalService,public dialog: MatDialog,) {
  	if (global.userid == null) {
  		this.openDialog()
  	}
    document.getElementById("loaderscreen").style.display = "none";
  }


   openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px', disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
   editprofile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '600px', disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
   changepassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '600px', disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
