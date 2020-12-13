import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() place: Place
  private currentCostText="Pick date to calculate cost"
  private startDate: string
  private endDate: string
  private todayDate=new Date(Date.now()).toISOString()
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.todayDate)
  }
  onStartDateChange(event: CustomEvent){
    this.startDate=event.detail.value;

    if(this.endDate){
      this.caclulateCost(this.startDate,this.endDate)
    }
  }
  onEndDateChange(event: CustomEvent){
    this.endDate=event.detail.value;
    if(this.startDate){

      this.caclulateCost(this.startDate,this.endDate)
    }
  }
  onBookPlace(){
    this.modalController.dismiss(null,'cancel')
  }
  onCancel(){
    this.modalController.dismiss({message:'booked'},'confirm')
  }
  caclulateCost(ds1:string,ds2:string){
    let d1=new Date(ds1)
    let d2=new Date(ds2)
    let diff = Math.floor(Math.abs(d2.getTime()-d1.getTime()) / (1000 * 60 * 60 * 24)); 
    if(diff<=0){diff=1}
    this.currentCostText="Total Cost = "+diff*this.place.price

  }

}
