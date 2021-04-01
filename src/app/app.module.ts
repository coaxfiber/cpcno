import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GlobalService } from './global.service';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { InputComponent } from './main/input/input.component';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { PdfComponent } from './main/pdf/pdf.component';
import { CpComponent } from './cp/cp.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersAddComponent } from './users/users-add/users-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    InfoComponent,
    InputComponent,
    PdfComponent,
    CpComponent,
    UsersComponent,
    LogsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UsersAddComponent,
  ],
  entryComponents: [
    InputComponent,
    PdfComponent,
    LoginComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UsersAddComponent,
   ],
  imports: [
   NgxPaginationModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
