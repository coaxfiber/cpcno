import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
const swal = require('sweetalert2');

@Injectable()
export class GlobalService {
  url="http://localhost/cpcno/dbconnection/"
  userid=null

  tdata=[]
  tdatacp=[]
  logs=[]
  users=[]
  constructor() {
     
  }
  
  swalloading(x){
	swal.fire({
	  title: x,
	  //allowOutsideClick: false,
	  onBeforeOpen: () => {
	    Swal.showLoading()
	  }
	})
  }
    user
  swalclose(){
  	swal.close()
  }
 swalerror(){
    swal.fire({
              type: 'error',
              title: 'Failed. Please Contact your Administrator.',
              showConfirmButton: false,
              timer: 1500
            }
            )
 }
 swalalert(a,b){
    swal.fire({
              type: a,
              title: b,
              showConfirmButton: true,
            }
            )
 }
  logout(){
    swal.fire({
      title: 'Logout?',
      text: "You are about to sign off?",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
       	this.userid = null
       	location.reload();
      }
    })
  }
}
