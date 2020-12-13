import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  constructor( private navController: NavController) { }

  onBookPlace(){
    this.navController.navigateBack('/places/tabs/discover')
  }
  ngOnInit() {
  }

}
