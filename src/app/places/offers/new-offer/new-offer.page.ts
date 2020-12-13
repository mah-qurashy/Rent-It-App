import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  private startDate: string
  private endDate: string
  private todayDate=new Date(Date.now()).toISOString()
  constructor() { }

  ngOnInit() {
  }
  onStartDateChange(event: CustomEvent){
    this.startDate=event.detail.value;
  }
  onEndDateChange(event: CustomEvent){
    this.endDate=event.detail.value;

  }
  onSubmit(form: NgForm){
    const title=form.value.title
    const description=form.value.description
    const startDate=form.value.startdate
    const endDate=form.value.enddate
    const price=form.value.price
  }


}
