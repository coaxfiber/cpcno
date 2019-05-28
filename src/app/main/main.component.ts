import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	id=''
  constructor(public dialog: MatDialog,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  }
	openDialog(x): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '500px',data:{type: x}, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
      }
    });
  }
}
