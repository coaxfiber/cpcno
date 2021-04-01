import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
	url
	title=""
 constructor(public global: GlobalService,private domSanitizer: DomSanitizer,public dialog: MatDialog,public dialogRef: MatDialogRef<PdfComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
 	this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.global.url+'uploads/'+data.id+'.pdf')
 	this.title= data.title
 	console.log(data.id)
 }

  closedialog(){
       this.dialogRef.close({result:'cancel'}); 
  }
  ngOnInit() {
  }

}
