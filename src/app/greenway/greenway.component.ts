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
    const fixedLocation = L.latLng(42.35975, -71.05218);
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

  tent4: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0525681, 42.3600365, 0.0],
          [-71.0525346, 42.3600474, 0.0],
          [-71.052552, 42.3600712, 0.0],
          [-71.0525855, 42.3600583, 0.0],
          [-71.0525681, 42.3600365, 0.0],
        ],
      ],
    },
  };

  tent1: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0527008, 42.36021, 0.0],
          [-71.0526861, 42.3601852, 0.0],
          [-71.0526485, 42.3602001, 0.0],
          [-71.0526673, 42.3602238, 0.0],
          [-71.0527008, 42.36021, 0.0],
        ],
      ],
    },
  };

  tent2: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.052666, 42.36018, 0.0],
          [-71.0526526, 42.3601562, 0.0],
          [-71.052619, 42.3601681, 0.0],
          [-71.0526351, 42.3601929, 0.0],
          [-71.052666, 42.36018, 0.0],
        ],
      ],
    },
  };

  tent3: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0526257, 42.3601314, 0.0],
          [-71.0526097, 42.3601086, 0.0],
          [-71.0525788, 42.3601215, 0.0],
          [-71.0525949, 42.3601453, 0.0],
          [-71.0526257, 42.3601314, 0.0],
        ],
      ],
    },
  };

  tent5: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0525118, 42.3599679, 0.0],
          [-71.0524997, 42.3599431, 0.0],
          [-71.0524675, 42.3599521, 0.0],
          [-71.0524796, 42.3599749, 0.0],
          [-71.0525118, 42.3599679, 0.0],
        ],
      ],
    },
  };
  tent6: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0524836, 42.3599075, 0.0],
          [-71.0524742, 42.3598837, 0.0],
          [-71.0524434, 42.3598886, 0.0],
          [-71.0524527, 42.3599134, 0.0],
          [-71.0524836, 42.3599075, 0.0],
        ],
      ],
    },
  };

  tent7: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0523864, 42.3598515, 0.0],
          [-71.0523776, 42.3598302, 0.0],
          [-71.0523441, 42.3598386, 0.0],
          [-71.0523535, 42.3598609, 0.0],
          [-71.0523864, 42.3598515, 0.0],
        ],
      ],
    },
  };

  tent8: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0523763, 42.3598252, 0.0],
          [-71.0523669, 42.3598024, 0.0],
          [-71.0523347, 42.3598113, 0.0],
          [-71.0523441, 42.3598351, 0.0],
          [-71.0523763, 42.3598252, 0.0],
        ],
      ],
    },
  };

  tent9: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0523535, 42.3597747, 0.0],
          [-71.0523408, 42.3597489, 0.0],
          [-71.0523086, 42.3597568, 0.0],
          [-71.0523206, 42.3597831, 0.0],
          [-71.0523535, 42.3597747, 0.0],
        ],
      ],
    },
  };

  tent10: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0523401, 42.3597444, 0.0],
          [-71.0523294, 42.3597192, 0.0],
          [-71.0522945, 42.3597281, 0.0],
          [-71.0523059, 42.3597519, 0.0],
          [-71.0523401, 42.3597444, 0.0],
        ],
      ],
    },
  };

  tent11: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0522603, 42.3596553, 0.0],
          [-71.0522509, 42.3596295, 0.0],
          [-71.0522147, 42.359636, 0.0],
          [-71.0522227, 42.3596627, 0.0],
          [-71.0522603, 42.3596553, 0.0],
        ],
      ],
    },
  };

  tent12: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0521973, 42.3596662, 0.0],
          [-71.0521892, 42.3596409, 0.0],
          [-71.052153, 42.3596459, 0.0],
          [-71.0521604, 42.3596736, 0.0],
          [-71.0521973, 42.3596662, 0.0],
        ],
      ],
    },
  };

  tent13: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0521483, 42.3596731, 0.0],
          [-71.0521416, 42.3596489, 0.0],
          [-71.0521041, 42.3596538, 0.0],
          [-71.0521121, 42.3596806, 0.0],
          [-71.0521483, 42.3596731, 0.0],
        ],
      ],
    },
  };

  tent14: any = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-71.0520927, 42.3596796, 0.0],
          [-71.0520866, 42.3596563, 0.0],
          [-71.0520511, 42.3596603, 0.0],
          [-71.0520585, 42.3596865, 0.0],
          [-71.0520927, 42.3596796, 0.0],
        ],
      ],
    },
  };

  number_1Icon = L.icon({
    iconUrl: '/assets/number_1.png',
    iconSize: [24, 24],
  });

  number_2Icon = L.icon({
    iconUrl: '/assets/number_2.png',
    iconSize: [24, 24],
  });

  number_3Icon = L.icon({
    iconUrl: '/assets/number_3.png',
    iconSize: [24, 24],
  });

  number_4Icon = L.icon({
    iconUrl: '/assets/number_4.png',
    iconSize: [24, 24],
  });

  number_5Icon = L.icon({
    iconUrl: '/assets/number_5.png',
    iconSize: [24, 24],
  });

  number_6Icon = L.icon({
    iconUrl: '/assets/number_6.png',
    iconSize: [24, 24],
  });

  number_7Icon = L.icon({
    iconUrl: '/assets/number_7.png',
    iconSize: [24, 24],
  });

  number_8Icon = L.icon({
    iconUrl: '/assets/number_8.png',
    iconSize: [24, 24],
  });

  number_9Icon = L.icon({
    iconUrl: '/assets/number_9.png',
    iconSize: [24, 24],
  });

  number_10Icon = L.icon({
    iconUrl: '/assets/number_10.png',
    iconSize: [24, 24],
  });

  number_11Icon = L.icon({
    iconUrl: '/assets/number_11.png',
    iconSize: [24, 24],
  });

  number_12Icon = L.icon({
    iconUrl: '/assets/number_12.png',
    iconSize: [24, 24],
  });

  number_13Icon = L.icon({
    iconUrl: '/assets/number_13.png',
    iconSize: [24, 24],
  });

  number_14Icon = L.icon({
    iconUrl: '/assets/number_14.png',
    iconSize: [24, 24],
  });

  number_1Location = L.latLng(42.36021, -71.05266);
  number_2Location = L.latLng(42.36018, -71.05263);
  number_3Location = L.latLng(42.36013, -71.05259);
  number_4Location = L.latLng(42.36006, -71.05254);
  number_5Location = L.latLng(42.35996, -71.05248);
  number_6Location = L.latLng(42.3599, -71.05245);
  number_7Location = L.latLng(42.35985, -71.05235);
  number_8Location = L.latLng(42.35983, -71.05234);
  number_9Location = L.latLng(42.35977, -71.05232);
  number_10Location = L.latLng(42.35974, -71.0523);
  number_11Location = L.latLng(42.35965, -71.05222);
  number_12Location = L.latLng(42.35966, -71.05216);
  number_13Location = L.latLng(42.35967, -71.05211);
  number_14Location = L.latLng(42.35967, -71.05206);

  mbtaIcon = L.icon({
    iconUrl: '/assets/mbta.png',
    iconSize: [24, 24],
  });

  mbtaLocation = L.latLng(42.426805472046574, -71.0743360438534);

  initMap(fixedLocation: L.LatLng) {
    this.map = L.map('map').setView(fixedLocation, 19);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRvY29ubm9yIiwiYSI6ImNsMmx4M2x1MTBnNWEzY3A2a3Fsd29ycTkifQ.aYhIjwbY7BnXcwcS15_MNg',
      {
        minZoom: 14,
        maxNativeZoom: 20,
        maxZoom: 20,
        crossOrigin: true,
      }
    ).addTo(this.map);

    const popupMessage = '<b>Team 1 Tent</b>';
    const number_1Marker = L.marker(this.number_1Location, {
      icon: this.number_1Icon,
    }).addTo(this.map);
    number_1Marker.bindPopup(popupMessage).openPopup();

    const popupMessage2 = '<b>Team 2 Tent</b>';
    const number_2Marker = L.marker(this.number_2Location, {
      icon: this.number_2Icon,
    }).addTo(this.map);
    number_2Marker.bindPopup(popupMessage2).openPopup();

    const popupMessage3 = '<b>Team 3 Tent</b>';
    const number_3Marker = L.marker(this.number_3Location, {
      icon: this.number_3Icon,
    }).addTo(this.map);
    number_3Marker.bindPopup(popupMessage3).openPopup();

    const popupMessage4 = '<b>Team 4 Tent</b>';
    const number_4Marker = L.marker(this.number_4Location, {
      icon: this.number_4Icon,
    }).addTo(this.map);
    number_4Marker.bindPopup(popupMessage4).openPopup();

    const popupMessage5 = '<b>Team 5 Tent</b>';
    const number_5Marker = L.marker(this.number_5Location, {
      icon: this.number_5Icon,
    }).addTo(this.map);
    number_5Marker.bindPopup(popupMessage5).openPopup();

    const popupMessage6 = '<b>Team 6 Tent</b>';
    const number_6Marker = L.marker(this.number_6Location, {
      icon: this.number_6Icon,
    }).addTo(this.map);
    number_6Marker.bindPopup(popupMessage6).openPopup();

    const popupMessage7 = '<b>Team 7 Tent</b>';
    const number_7Marker = L.marker(this.number_7Location, {
      icon: this.number_7Icon,
    }).addTo(this.map);
    number_7Marker.bindPopup(popupMessage7).openPopup();

    const popupMessage8 = '<b>Team 8 Tent</b>';
    const number_8Marker = L.marker(this.number_8Location, {
      icon: this.number_8Icon,
    }).addTo(this.map);
    number_8Marker.bindPopup(popupMessage8).openPopup();

    const popupMessage9 = '<b>Team 9 Tent</b>';
    const number_9Marker = L.marker(this.number_9Location, {
      icon: this.number_9Icon,
    }).addTo(this.map);
    number_9Marker.bindPopup(popupMessage9).openPopup();

    const popupMessage10 = '<b>Team 10 Tent</b>';
    const number_10Marker = L.marker(this.number_10Location, {
      icon: this.number_10Icon,
    }).addTo(this.map);
    number_10Marker.bindPopup(popupMessage10).openPopup();

    const popupMessage11 = '<b>Team 11 Tent</b>';
    const number_11Marker = L.marker(this.number_11Location, {
      icon: this.number_11Icon,
    }).addTo(this.map);
    number_11Marker.bindPopup(popupMessage11).openPopup();

    const popupMessage12 = '<b>Team 12 Tent</b>';
    const number_12Marker = L.marker(this.number_12Location, {
      icon: this.number_12Icon,
    }).addTo(this.map);
    number_12Marker.bindPopup(popupMessage12).openPopup();

    const popupMessage13 = '<b>Team 13 Tent</b>';
    const number_13Marker = L.marker(this.number_13Location, {
      icon: this.number_13Icon,
    }).addTo(this.map);
    number_13Marker.bindPopup(popupMessage13).openPopup();

    const popupMessage14 = '<b>Team 14 Tent</b>';
    const number_14Marker = L.marker(this.number_14Location, {
      icon: this.number_14Icon,
    }).addTo(this.map);
    number_14Marker.bindPopup(popupMessage14).openPopup();

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
        fillOpacity: 0.4, // 50% opacity
        weight: 2, // border weight
        color: '#000000', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.tent4, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.tent1, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
    L.geoJSON(this.tent2, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent3, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent5, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent6, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent7, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent8, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent9, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent10, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent11, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent12, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent13, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);

    L.geoJSON(this.tent14, {
      style: {
        fillColor: '#f1f2f6',
        fillOpacity: 1, // 50% opacity
        weight: 2, // border weight
        color: '#747d8c', // border color
        opacity: 1, // border opacity
      },
    }).addTo(this.map);
  }
}
