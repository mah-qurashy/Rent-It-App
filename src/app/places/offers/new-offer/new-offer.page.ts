import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  private todayDate=new Date(Date.now()).toISOString()
  constructor() { }

  ngOnInit() {
  }
  onSubmit(form: NgForm){
    if (!form.valid){
      return
    }
    const title=form.value.title
    const description=form.value.description
    const startDate=form.value.startdate
    const endDate=form.value.enddate
    const price=form.value.price
  }


}
