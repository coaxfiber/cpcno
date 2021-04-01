import { Component, OnInit } from '@angular/core';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';import { map } from "rxjs/operators";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
	username="default"
	status='Inactive'
	name=''
  temppic
  constructor(private http: Http,public dialog: MatDialog,public dialogRef: MatDialogRef<EditProfileComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,) { }

  ngOnInit() {
    console.log(this.global.user.name)
    this.name = this.global.user.name
    this.temppic = this.global.user.picture
    this.attachment =  this.global.user.picture
  }

  filetype=''
  attachment=''
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type.includes('jpg')||file.type.includes('png')) {

          this.filetype = file.type
          this.temppic = "data:image/png;base64,"+reader.result.toString().split(',')[1]
          this.attachment = "data:image/png;base64,"+reader.result.toString().split(',')[1]
        }else{
          alert("Invalid Image Type");
        }
      };
    }
   
  }

  closedialog(){
       this.dialogRef.close({result:'cancel'}); 
  }
  
  savedata(){
    var x = ''
    if (this.name == '') {
      x=x+"*Name is required!<br>"
    }
    if (this.attachment == '') {
      x=x+"*Picture is required!<br>"
    }

    if (x=='') {
       var header = new Headers();
                     header.append("Accept", "application/json");
                     header.append("Content-Type", "application/x-www-form-urlencoded");    
              let option = new RequestOptions({ headers: header });
              let urlSearchParams = new URLSearchParams();
                  urlSearchParams.append("pass",'updateprofile');
                  urlSearchParams.append("name",this.name);
                  urlSearchParams.append("picture",this.temppic);
                  urlSearchParams.append("id",this.global.user.id);
              let body = urlSearchParams.toString()
            this.global.swalloading("")
            this.http.post(this.global.url+'', body,option)
               .map(response => response.json())
              .subscribe(res => {
                    console.log(res)
                    this.global.swalalert("success","Profile Updated!")
                    this.global.user.name=this.name
                    this.global.user.picture=this.temppic
                     this.dialogRef.close({result:'cancel'}); 
                    //
                  },Error=>{
                    console.log(Error)
                    this.global.swalerror()
                 
                  });
    }else{
      this.global.swalalert("warning",x)
    }
  }
}
