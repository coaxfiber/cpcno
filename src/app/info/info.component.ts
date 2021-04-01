import { Component, OnInit } from '@angular/core';

import { GlobalService } from './../global.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(public global: GlobalService,) { }

  ngOnInit() {
  	this.global.swalclose()
  }

}
