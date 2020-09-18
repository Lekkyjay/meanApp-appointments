import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  //ngModel properties that will be used to setup form controls in the template
  public successMsg: string;
  public errorMsg: string;
  public appointmentDate: string;
  public name: string;
  public email: string;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.email = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment booked successfully for ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
  }

}
