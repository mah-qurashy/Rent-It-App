import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places/places.service';
import { Booking } from './booking.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  public bookings: Booking[]

  constructor(private bookingsService: BookingsService, public placesService: PlacesService) { }
  

  ngOnInit() {
    this.bookings=this.bookingsService.getBookings()
  }
  ionViewWillEnter(){this.bookings=this.bookingsService.getBookings()}

}
