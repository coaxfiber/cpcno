import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
	@ViewChild("tid") tid:ElementRef;
	@ViewChild("sid") sid:ElementRef;
	id=''
	title=''
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<InputComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) { 
  	if (data.type==1) {
  		this.title = "Journal";
  	}else if (data.type==2) {
  		this.title = "News Paper";
  	}else if (data.type==3) {
  		this.title = "Magazine";
  	}
  }

  ngOnInit() {
  }

  keyDownFunction(event) {
  		if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
			this.sid.nativeElement.focus();
		}
  }
}
