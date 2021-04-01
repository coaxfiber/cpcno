import { Component, OnInit } from '@angular/core';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';import { map } from "rxjs/operators";
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	np=''
	op=''
	cnp=''
	constructor(private http: Http,public dialog: MatDialog,public dialogRef: MatDialogRef<ChangePasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService) { }

  ngOnInit() {
  }

  closedialog(){
       this.dialogRef.close({result:'cancel'}); 
  }
  savedata(){
    var x=''

    if (this.np == '') {
      x=x+"*New Password is required!<br>"
    }
    if (this.op == '') {
      x=x+"*Old Password is required!<br>"
    }
    if (this.cnp == '') {
      x=x+"*Confirm New Password is required!<br>"
    }
    if (x=='') {

      var a = ''
      if (this.np!=this.cnp) {
        a=a+"*New Password does not match the Confirm New Password!<br>"
      }

      console.log(a)
      if (a=='') {
         var header = new Headers();
                     header.append("Accept", "application/json");
                     header.append("Content-Type", "application/x-www-form-urlencoded");    
              let option = new RequestOptions({ headers: header });
              let urlSearchParams = new URLSearchParams();
                  urlSearchParams.append("pass",'changepassword');
                  urlSearchParams.append("old",this.op);
                  urlSearchParams.append("new",this.np);
                  urlSearchParams.append("id",this.global.user.id);
                  urlSearchParams.append("username",this.global.user.username);
                    urlSearchParams.append("user",this.global.user.name);
              let body = urlSearchParams.toString()
            this.global.swalloading("")
            this.http.post(this.global.url+'', body,option)
               .map(response => response.json())
              .subscribe(res => {
                    if (res.message == 'success') {
                     this.global.swalalert("success","Password Updated!")
                     this.dialogRef.close({result:'cancel'}); 
                    }else{
                     this.global.swalalert("warning","Incorrect Old Password!")
                    }
                    //
                  },Error=>{
                    console.log(Error)
                    this.global.swalerror()
                 
                  });
       }else{
          this.global.swalalert("warning",a)
       }
    }else
    {
      this.global.swalalert("warning",x)
    }
  }

}
