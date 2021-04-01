import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

import { UsersAddComponent } from './users-add/users-add.component';

const swal = require('sweetalert2');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p=1
  search=''
  collection=[]
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http) {
   this.collection = this.global.users
    if (this.global.users.length==0) {
      this.getdata()
    }
  }

  ngOnInit() {
  }
  keyDownFunction(){
    this.collection = []
    if (this.search=='') {
      this.collection = this.global.users
    }else{
      for (var i = 0; i < this.global.users.length; ++i) {
        if (
          this.global.users[i].username.toLowerCase().includes(this.search.toLowerCase())||
          this.global.users[i].name.toLowerCase().includes(this.search.toLowerCase())||
          this.global.users[i].type.toLowerCase().includes(this.search.toLowerCase())
          ) {
          this.collection.push(this.global.users[i])
        }
      }
    }
  }
openDialog(x){}

  getdata(){
    this.global.users = undefined
    this.collection = []
    var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pass",'getusers');
                    
                  let body = urlSearchParams.toString()
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {
          console.log(res)
            this.global.users = res.data
            this.collection = res.data
            this.keyDownFunction()
          },Error=>{
          	console.log(Error)
            this.collection = []
            this.global.tdata = []
            this.global.swalerror()
          });
  }


  deleteit(x){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pass",'deleteuser');
                    urlSearchParams.append("id",x);
                    urlSearchParams.append("user",this.global.user.name);
                    
                  let body = urlSearchParams.toString()
                  this.global.swalloading('')
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {

            swal.fire({
              type: 'success',
              title: 'Record has been deleted.',
              showConfirmButton: false,
              timer: 1500
            }
            )
            this.getdata()
          },Error=>{

            this.global.swalerror()
            this.collection = []
            this.global.tdata = []
          });
      }
    })
  }


  openDialogadd(x,data=null): void {
    const dialogRef = this.dialog.open(UsersAddComponent, {
      width: '500px',data:{type: x,data:data}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.result=='success') {
          this.getdata();
        }
      }
    });
  }
  
}
