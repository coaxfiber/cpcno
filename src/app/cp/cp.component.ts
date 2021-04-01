import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { InputComponent } from './../main/input/input.component';
import Swal from 'sweetalert2';

import { PdfComponent } from './../main/pdf/pdf.component';
const swal = require('sweetalert2');

@Component({
  selector: 'app-cp',
  templateUrl: './cp.component.html',
  styleUrls: ['./cp.component.css']
})
export class CpComponent implements OnInit {
	id=''
  search=''
   p: number = 1;
   collection
  constructor(public dialog: MatDialog,public global: GlobalService,private http: Http) {
    this.collection = this.global.tdatacp
    if (this.global.tdatacp.length==0) {
      this.getdata()
    }
  }

  ngOnInit() {
  }
  openDialog(x,data=null): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '500px',data:{type: x,data:data}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.result=='success') {
             swal.fire({
                type: 'success',
                title: result.m,
                showConfirmButton: false,
                timer: 1500
              }
            )
          this.getdata();
        }
      }
    });
  }
  getattachmentsize(x){
    if (x.length<10) {
      return x;
    }else
      {
        var y =''

        for (var i = 0; i < 10; ++i) {
          y=y+x[i]
        }
        return y+"..."
      }
  }
  openpdf(data,title): void {
    const dialogRef = this.dialog.open(PdfComponent, {
      width: '99%',data:{id:'cp/'+data,title:title}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.result=='success') {

        }
      }
    });
  }

  keyDownFunction(){
    this.collection = []
    if (this.search=='') {
      this.collection = this.global.tdatacp
    }else{
      for (var i = 0; i < this.global.tdatacp.length; ++i) {
        if (
          this.global.tdatacp[i].controlno.includes(this.search)||
          this.global.tdatacp[i].name.includes(this.search)||
          this.global.tdatacp[i].title.includes(this.search)
          ) {
          this.collection.push(this.global.tdatacp[i])
        }
      }
    }
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
                    urlSearchParams.append("pass",'deletecno');
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

  getdata(){
    this.global.tdatacp = undefined
    this.collection = []
    var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pass",'getdataallcp');
                    urlSearchParams.append("user",this.global.user.name);
                    
                  let body = urlSearchParams.toString()
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {
            this.global.tdatacp = res.data
            this.collection = res.data
            this.keyDownFunction()
          },Error=>{

            this.collection = []
            this.global.tdata = []
            this.global.swalerror()
          });
  }
}
