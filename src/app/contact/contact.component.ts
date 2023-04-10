import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { map } from 'rxjs/operators';
import * as turf from '@turf/turf';
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
    const fixedLocation = L.latLng(42.35706, -71.05744);
    this.initMap(fixedLocation);

    this.getPosition().subscribe(
      (position) => {
        if (this.map && this.marker) {
          this.marker.setLatLng([position.latitude, position.longitude]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  boundary: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.1058313, 42.4138324, 0.0],
          [-71.0366555, 42.4141492, 0.0],
          [-71.0365697, 42.4405666, 0.0],
          [-71.1066037, 42.4405033, 0.0],
          [-71.1058313, 42.4138324, 0.0],
        ],
      ],
    },
  };

  siteIcon = L.icon({
    iconUrl: '/assets/red-pin.png',
    iconSize: [40, 40],
  });

  siteLocation = L.latLng(42.35706, -71.05744);

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 13);
    L.tileLayer(
      'https://retina-tiles.p.rapidapi.com/local/osm{r}/v1/{z}/{x}/{y}.png?rapidapi-key=839febf5e9msh4f0bd2b2b0c8404p1587b4jsn4d7cc445eda5',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);

    const popupContent = `
  <div class="popup-content">
    <h2>Event Site Maps</h2>
    <p>Boston, MA USA</p>
    <p>(978) 235-3397</p>
    <p>info@eventsitemaps.dev</p>
  </div>
`;

    const popup = L.popup();
    popup.setContent(popupContent);
    const siteMarker = L.marker(this.siteLocation, {
      icon: this.siteIcon,
    }).addTo(this.map);
    siteMarker.bindPopup(popup).openPopup();

    this.getPosition().subscribe(
      (position) => {
        const latLng = L.latLng(position.latitude, position.longitude);
        const isInsideBoundary = booleanPointInPolygon(
          turf.point([position.longitude, position.latitude]),
          this.boundary
        );
        if (this.map && this.marker) {
          if (isInsideBoundary) {
            this.marker.setLatLng(latLng);
            this.map.setView(latLng, 16);
          } else {
            this.marker.setLatLng([0, 0]);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getPosition(): Observable<{ latitude: number; longitude: number }> {
    return new Observable<{ latitude: number; longitude: number }>(
      (observer) => {
        if (navigator.geolocation) {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.locationService.setPosition({ latitude, longitude });
              if (this.map && this.marker) {
                this.marker.setLatLng([latitude, longitude]);
              }
              observer.next({ latitude, longitude });
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Geolocation is not supported by this browser.');
        }
      }
    );
  }
}
