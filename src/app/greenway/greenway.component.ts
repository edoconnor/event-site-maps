import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as geolib from 'geolib';

@Component({
  selector: 'app-greenway',
  templateUrl: './greenway.component.html',
  styleUrls: ['./greenway.component.css'],
})
export class GreenwayComponent implements OnInit {
  map: L.Map | null = null;
  marker: L.Marker | null = null;
  routePoints: L.LatLng[] = [];

  animatedCircleIcon = {
    icon: L.divIcon({
      className: 'gps_marker_icon',
      html: '<div class="gps_marker"></div>',
      iconSize: [20, 20],
    }),
  };

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    const fixedLocation = L.latLng(42.35939524219426, -71.05234434002612);
    this.initMap(fixedLocation);
  }

  rkg1: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.053064, 42.3605107, 0.0],
          [-71.0528414, 42.3603165, 0.0],
          [-71.0527126, 42.3601738, 0.0],
          [-71.0525866, 42.3599994, 0.0],
          [-71.0524981, 42.3598527, 0.0],
          [-71.0524149, 42.3596704, 0.0],
          [-71.0523827, 42.359602, 0.0],
          [-71.0518918, 42.3596803, 0.0],
          [-71.0519777, 42.3599201, 0.0],
          [-71.0520823, 42.3601104, 0.0],
          [-71.0522003, 42.3602729, 0.0],
          [-71.0523237, 42.3604394, 0.0],
          [-71.0524203, 42.3605504, 0.0],
          [-71.0525919, 42.360705, 0.0],
          [-71.0527395, 42.3608318, 0.0],
          [-71.0527783, 42.3608154, 0.0],
          [-71.0529165, 42.3606782, 0.0],
          [-71.0530707, 42.360534, 0.0],
          [-71.053064, 42.3605107, 0.0],
        ],
      ],
    },
  };

  rkg2: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0523351, 42.3594529, 0.0],
          [-71.052148, 42.3588171, 0.0],
          [-71.0521188, 42.3587725, 0.0],
          [-71.0520736, 42.3587557, 0.0],
          [-71.0517111, 42.3588077, 0.0],
          [-71.0516728, 42.3588377, 0.0],
          [-71.0516612, 42.3588657, 0.0],
          [-71.0518458, 42.3595438, 0.0],
          [-71.051899, 42.3595709, 0.0],
          [-71.0521262, 42.3595358, 0.0],
          [-71.0522881, 42.3595113, 0.0],
          [-71.0523257, 42.3594875, 0.0],
          [-71.0523351, 42.3594529, 0.0],
        ],
      ],
    },
  };

  rkg3: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0520943, 42.3586358, 0.0],
          [-71.0518744, 42.3579143, 0.0],
          [-71.0518214, 42.3578995, 0.0],
          [-71.0517684, 42.3578965, 0.0],
          [-71.0516085, 42.3579183, 0.0],
          [-71.0514486, 42.3579441, 0.0],
          [-71.0514157, 42.3579639, 0.0],
          [-71.0516156, 42.3587091, 0.0],
          [-71.0520943, 42.3586358, 0.0],
        ],
      ],
    },
  };

  overlay: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0732939, 42.3693091, 0.0],
          [-71.0726073, 42.3493307, 0.0],
          [-71.0378029, 42.3493942, 0.0],
          [-71.0378458, 42.3695627, 0.0],
          [-71.0733368, 42.3698481, 0.0],
          [-71.0732939, 42.3693091, 0.0],
        ],
      ],
    },
  };

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 18);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRvY29ubm9yIiwiYSI6ImNsMmx4M2x1MTBnNWEzY3A2a3Fsd29ycTkifQ.aYhIjwbY7BnXcwcS15_MNg',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);

    L.geoJSON(this.rkg1, {
      style: {
        fillColor: '#00b894',
        fillOpacity: 0.5, // 50% opacity
        weight: 2, // border weight
        color: '#55efc4', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.rkg2, {
      style: {
        fillColor: '#00b894',
        fillOpacity: 0.5, // 50% opacity
        weight: 2, // border weight
        color: '#55efc4', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.rkg3, {
      style: {
        fillColor: '#00b894',
        fillOpacity: 0.5, // 50% opacity
        weight: 2, // border weight
        color: '#55efc4', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.overlay, {
      style: {
        fillColor: '#575fcf',
        fillOpacity: 0.5, // 50% opacity
        weight: 2, // border weight
        color: '#000000', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
  }
}
