import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { CpComponent } from './cp/cp.component';
import { UsersComponent } from './users/users.component';
import { LogsComponent } from './logs/logs.component';
const routes: Routes = [
  {
    path: '',
    component: InfoComponent
  },
  {
    path: 'cno',
    component: MainComponent
  },
  {
    path: 'cp',
    component: CpComponent
  },
  {
    path: 'home',
    component: InfoComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
