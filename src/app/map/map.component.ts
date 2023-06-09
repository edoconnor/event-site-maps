import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as geolib from 'geolib';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
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
    this.getPosition().subscribe(
      (position) => {
        const userLocation = L.latLng(position.latitude, position.longitude);
        this.initMap(userLocation);

        if (this.map && this.marker) {
          this.marker.setLatLng(userLocation);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redIcon = L.icon({
    iconUrl: '/assets/red-pin.png',
    iconSize: [24, 24],
  });

  redLocation = L.latLng(42.36641024559977, -71.05437002052903);

  initMap(fixedLocation: L.LatLng) {
    if (this.map) {
      return;
    }
    this.map = L.map('map').setView(fixedLocation, 16);
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);

    this.marker = L.marker(fixedLocation, {
      icon: this.animatedCircleIcon.icon,
    }).addTo(this.map);

    const popupOptions = {
      maxWidth: 200,
    };

    const popupContent = `<div class="custom-popup img-fluid"><img src="assets/logo-white.png"/><p>We build custom geolocation site maps with smart features! <a href="/details">More ...</a></p></div>`;
    this.marker.bindPopup(popupContent, popupOptions).openPopup();
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
