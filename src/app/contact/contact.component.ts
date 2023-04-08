import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  routePoints: L.LatLng[] = [];

  animatedCircleIcon = {
    icon: L.divIcon({
      className: 'gps_marker_icon',
      html: '<div class="gps_marker"></div>',
      iconSize: [18, 22],
    }),
  };

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    const fixedLocation = L.latLng(42.35629, -71.0698);
    this.initMap(fixedLocation);
  }

  initMap(fixedLocation: L.LatLng) {
    
    this.map = L.map('map').setView(fixedLocation, 13);
    L.tileLayer(
      'https://retina-tiles.p.rapidapi.com/local/osm{r}/v1/{z}/{x}/{y}.png?rapidapi-key=839febf5e9msh4f0bd2b2b0c8404p1587b4jsn4d7cc445eda5',
      {
        minZoom: 1,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);
}
}