import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { MaterialTableComponent } from './material-table/material-table.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'appointment-list',
    component: AppointmentListComponent
  },
  {
    path: 'mat-table',
    component: MaterialTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
