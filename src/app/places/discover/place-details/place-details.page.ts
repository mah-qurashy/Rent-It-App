
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  private place: Place

  constructor( private navController: NavController, private placesService: PlacesService, private activatedRoute: ActivatedRoute) { }

  onBookPlace(){
    this.navController.navigateBack('/places/tabs/discover')
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('placeId')){
        this.navController.navigateBack('/places/tabs/offers')
        return
      }
      console.log(paramMap.get('placeId'))
      this.place = this.placesService.getPlace(paramMap.get('placeId'))
      if(!this.place){
        this.navController.navigateBack('/places/tabs/offers')
        return
      }
    })

}
}
