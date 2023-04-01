import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';
import { map } from 'rxjs/operators';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

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

  initMap(fixedLocation: L.LatLng) {
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
    
    this.marker.bindPopup('Your current location').openPopup();

    this.getPosition().subscribe(
      (position) => {
        const latLng = L.latLng(position.latitude, position.longitude);
        if (this.map && this.marker) {
          const newLatLng = this.getNewLatLng(latLng, 300); // Replace 100 with the distance you want to move the marker
          this.marker.setLatLng(newLatLng);
          this.map.setView(newLatLng);
          this.marker.openPopup();
          setTimeout(() => {
            if (this.marker) {
              this.marker.closePopup();
              this.marker.unbindPopup();
              this.marker.bindPopup('New location').openPopup();
            }
          }, 5000); // Replace 5000 with the amount of time you want to wait in milliseconds
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getNewLatLng(latLng: L.LatLng, distance: number) {
    const R = 6371e3; // Earth's radius in meters
    const brng = 45 * Math.PI / 180; // Bearing in radians
    const lat1 = latLng.lat * Math.PI / 180; // Convert to radians
    const lon1 = latLng.lng * Math.PI / 180; // Convert to radians
    const d = distance; // Distance in meters
  
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng));
    const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2));
    
    return L.latLng(lat2 * 180 / Math.PI, lon2 * 180 / Math.PI); // Convert back to degrees
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
