import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model'

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  private _places: Place[]=[]
  private isAuthenticated: boolean

  constructor(private  placesService: PlacesService) { 
  }

  ngOnInit() {
    this._places=this.placesService.getPlaces()

  }

}
