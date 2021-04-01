import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { GlobalService } from './../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';import { map } from "rxjs/operators";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http,private router: Router,public global: GlobalService,public dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  username=''
  password=''
  keyDownFunction(event){
    if (event.keyCode == 13) {
      event.preventDefault();
      this.calltologin()
    }
  }
	calltologin(){
    
        if (this.username==''||this.password=='') {
          this.global.swalalert('warning','Please fill in the required fields!')
        }else {
            var header = new Headers();
                     header.append("Accept", "application/json");
                     header.append("Content-Type", "application/x-www-form-urlencoded");    
              let option = new RequestOptions({ headers: header });
              let urlSearchParams = new URLSearchParams();
                  urlSearchParams.append("pass",'login');
                  urlSearchParams.append("username",this.username);
                  urlSearchParams.append("password",this.password);
              let body = urlSearchParams.toString()
            this.global.swalloading("Logging in...")
            this.http.post(this.global.url+'', body,option)
               .map(response => response.json())
              .subscribe(res => {
                    console.log(res)
                    if (res.message=='no record') {
                      this.global.swalalert("warning",'Incorrect login creadentials!')
                    }else{
                      this.global.userid=res.data.id
                      this.global.user=res.data
                      this.dialogRef.close({result:'cancel'}); 
                      this.global.swalclose()
                      }
                    //
                  },Error=>{
                    console.log(Error)
                    this.global.swalerror()
                 
                  });
        }

    }

  ngOnInit() {
    this.router.navigate(['home']);
  }

}
