import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../../global.service';
import { ViewChild,ElementRef } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';import { map } from "rxjs/operators";
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  controlno=''
  cno=''
  name=''
  ptitle=''
  location=''
  dateissue=''
  attachment=''
  attachmentname=''
	title=''

  
  constructor(private domSanitizer: DomSanitizer,public dialog: MatDialog,public dialogRef: MatDialogRef<InputComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
    if (data.type==0) {
      this.title = "Add CNO Record";
      this.datenow = new Date().toJSON().slice(0,10);
    }else if (data.type==1) {
      this.title = "Update CNO Record";
      this.controlno = data.data.controlno
      this.cno = data.data.cno
      this.name = data.data.name
      this.ptitle = data.data.title
      this.location = data.data.location
      this.attachment = data.data.attach
      this.attachmentname = data.data.attachname
      this.datenow = data.data.dataissue
      this.filetype='application/pdf'
    } else
    if (data.type==2) {
      this.title = "Add CP Record";
      this.datenow = new Date().toJSON().slice(0,10);
    }else if (data.type==3) {
      this.title = "Update CP Record";
      this.controlno = data.data.controlno
      this.cno = data.data.cno
      this.name = data.data.name
      this.ptitle = data.data.title
      this.location = data.data.location
      this.attachment = data.data.attach
      this.attachmentname = data.data.attachname
      this.datenow = data.data.dataissue
      this.filetype='application/pdf'
    }



  }
  removedata(){
      this.attachment = ''
      this.attachmentname = ''
      this.filetype=''
  }
 getattachmentsize(x){
    if (x.length<20) {
      return x;
    }else
      {
        var y =''

        for (var i = 0; i < 20; ++i) {
          y=y+x[i]
        }
        return y+"..."
      }
  }
  datenow
  ngOnInit() {
  }

  closedialog(){
       this.dialogRef.close({result:'cancel'}); 
  }
  fileToUpload
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  savedatatemp=0
  savedata()
  {
    var x = ''

    if (this.cno == '' && (this.data.type==1||this.data.type==0)) {
      x=x+"*CNO No. is required!\n"
    }
    if (this.controlno == '' && (this.data.type==2||this.data.type==3)) {
      x=x+"*CP No. is required!\n"
    }
    if (this.name == '') {
      x=x+"*Name of the Proponent. is required!\n"
    }
    if (this.ptitle == '') {
      x=x+"*Project Title is required!\n"
    }
    if (this.location == '') {
      x=x+"*Location is required!\n"
    }
    if (this.fileToUpload!=undefined) {
      if (this.fileToUpload.type != 'application/pdf') {
        x=x+"*Invalid File Type!\n"
      }
    }else{
      x=x+"*No File detected!\n"
    }
    if (x!='') {
      alert(x)
    }else{
    this.savedatatemp=1
    var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                  if (this.data.type==0) {
                    urlSearchParams.append("pass",'createdata');
                  }else
                    urlSearchParams.append("pass",'createdatacp');

                    urlSearchParams.append("controlno",this.controlno);
                    urlSearchParams.append("cno",this.cno);
                    urlSearchParams.append("name",this.name);
                    urlSearchParams.append("title",this.ptitle);
                    urlSearchParams.append("dateissue",this.datenow);
                    urlSearchParams.append("location",this.location);
                    urlSearchParams.append("user",this.global.user.name);
                    urlSearchParams.append("attachment",this.attachment);
                    urlSearchParams.append("attachmentname",this.fileToUpload.name);
                    urlSearchParams.append("user_id",this.global.userid.toString());
      let body = urlSearchParams.toString()
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {
        this.savedatatemp=0
        if (res.message=='failed') {
          alert("FAILED TO SAVE DATA!\nCNO No. Duplicate.")
        }else{
          let formData = new FormData(); 
          formData.append('file', this.fileToUpload, this.fileToUpload.name); 
              this.http.post(this.global.url+'upload.php?data='+this.controlno+this.cno+'&type='+this.data.type, formData)
                 .map(response => response.text())
                .subscribe(res => {
                  console.log(res)
                  console.log('post_max_size and upload_max_filesize t0 50m then restart apache')
                    });
            this.dialogRef.close({result:'success',m:"Record Added!"}); 
        }
          },Error=>{
            console.log(Error)
            alert("Failed. Please Contact your Adminstrator. Please also check the file size of the pdf file.")
            this.savedatatemp=0
          });
      }
  }

  filetype=''
  maindoclabel =  "Choose a file";
  imagebase64=''
  onFileChange(event) {

    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type.includes('pdf')) {
          this.attachmentname = file.name
          this.filetype = file.type
          this.attachment = reader.result.toString().split(',')[1]

          if (this.attachment!=null) {
           this.maindoclabel = file.name;
          }else{
            this.maindoclabel = "Choose a file";
          }

        }else{
          alert("Invalid Extension Type");
        }
      };
    }
   
  }


  Updatedata()
  {
    var x = ''
   if (this.cno == '' && (this.data.type==1||this.data.type==0)) {
      x=x+"*CNO No. is required!\n"
    }
    if (this.controlno == '' && (this.data.type==2||this.data.type==3)) {
      x=x+"*CP No. is required!\n"
    }
    if (this.name == '') {
      x=x+"*Name of the Proponent. is required!\n"
    }
    if (this.ptitle == '') {
      x=x+"*Project Title is required!\n"
    }
    if (this.location == '') {
      x=x+"*Location is required!\n"
    }
    if (this.fileToUpload!=undefined) {
      if (this.fileToUpload.type != 'application/pdf') {
        x=x+"*Invalid File Type!\n"
      }
    }else{
      //x=x+"*No File detected!\n"
    }
    if (x!='') {
      alert(x)
    }else{
    this.savedatatemp=1
    var header = new Headers();
             header.append("Accept", "application/json");
             header.append("Content-Type", "application/x-www-form-urlencoded");    
      let option = new RequestOptions({ headers: header });
      let urlSearchParams = new URLSearchParams();
                   if (this.data.type==1) {
                    urlSearchParams.append("pass",'Updatedata');
                  }else
                    urlSearchParams.append("pass",'Updatedatacp');

                    urlSearchParams.append("controlno",this.controlno);
                    urlSearchParams.append("id",this.data.data.id);
                    urlSearchParams.append("cno",this.cno);
                    urlSearchParams.append("name",this.name);
                    urlSearchParams.append("title",this.ptitle);
                    urlSearchParams.append("dateissue",this.datenow);
                    urlSearchParams.append("location",this.location);
                    urlSearchParams.append("attachment",this.attachment);
                    if (this.fileToUpload==undefined) {
                      urlSearchParams.append("attachmentname",this.attachmentname);
                    }else
                      urlSearchParams.append("attachmentname",this.fileToUpload.name);
                    urlSearchParams.append("user",this.global.user.name);
                    urlSearchParams.append("user_id",this.global.userid.toString());
      let body = urlSearchParams.toString()
    this.http.post(this.global.url+'', body,option)
       .map(response => response.json())
      .subscribe(res => {
        this.savedatatemp=0
        if (res.message=='failed') {
          alert("FAILED TO UPDATE DATA!\n\nControl no. Duplicate.")
        }else{
          if (this.fileToUpload!=undefined) {
              if (this.controlno==null) {
                this.controlno = ''
              } if (this.cno==null) {
                this.cno = ''
              }
              let formData = new FormData(); 
              formData.append('file', this.fileToUpload, this.fileToUpload.name); 
                  this.http.post(this.global.url+'upload.php?data='+this.controlno+this.cno+'&type='+this.data.type, formData)
                     .map(response => response.text())
                    .subscribe(res => {
                      console.log(res)
                      console.log('post_max_size and upload_max_filesize t0 50m then restart apache')
                        });
          }
          this.dialogRef.close({result:'success',m:"Record Updated!"});
        } 
          },Error=>{
            console.log(Error)
            this.global.swalerror()
            this.savedatatemp=0
          });
      }
  }
}
