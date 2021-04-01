import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { InputComponent } from './../main/input/input.component';
import Swal from 'sweetalert2';

import { PdfComponent } from './../main/pdf/pdf.component';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
	datenow
	collection=[]
  constructor(public global: GlobalService,private http: Http) {
   }
  start
  end
  ngOnInit() {
  	var today = new Date();

  	var month
  	if (today.getMonth()+1<10) {
  		month= '0'+(today.getMonth()+1).toString()
  	}else{
  		month = (today.getMonth()+1).toString()
  	}
  	var day
  	if (today.getDate()<10) {
  		day= '0'+(today.getDate()).toString()
  	}else{
  		day= (today.getDate()).toString()
  	}
  	var date2 = today.getFullYear()+'-'+month+'-'+day;
      

     
     this.datenow = date2;

      this.start = this.datenow + " 00:00:00";
      this.end = this.datenow + " 23:59:59";
      this.start = this.toTimestamp(this.start )
      this.end = this.toTimestamp(this.end )
      this.getdata()
  }
		toTimestamp(strDate){
		 var datum = Date.parse(strDate);
		 return datum/1000;
		}
  getdata(){
    this.global.logs = undefined
    this.collection = []
    var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                    urlSearchParams.append("pass",'getlogs');
                    urlSearchParams.append("start",this.start);
                    urlSearchParams.append("end",this.end);
                    
                  let body = urlSearchParams.toString()
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {
      	console.log(res)
            this.global.logs = res.data
            this.collection = res.data
          },Error=>{

            this.collection = []
            this.global.logs = []
            this.global.swalerror()
          });
  }

  checkdate(){
      this.start = this.datenow + " 00:00:00";
      this.end = this.datenow + " 23:59:59";
      this.start = this.toTimestamp(this.start )
      this.end = this.toTimestamp(this.end )
      this.getdata()
  }

    timeConverter(UNIX_timestamp){
      var date = new Date(UNIX_timestamp * 1000);
      
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
}
