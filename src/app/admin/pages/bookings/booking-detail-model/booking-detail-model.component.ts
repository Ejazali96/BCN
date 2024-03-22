import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-booking-detail-model',
  templateUrl: './booking-detail-model.component.html',
  styleUrls: ['./booking-detail-model.component.scss']
})
export class BookingDetailModelComponent {

  data: any
  zoom = 11;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 5,
  };
  markers: any[] = []

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
  ) {
    this.data = config.data
  }

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   };
    // })
    this.center = {
      lat: parseFloat(this.data.locations[0].lat),
      lng: parseFloat(this.data.locations[0].lng),
    }
    this.data.locations.forEach((element: any) => {
      this.markers.push({
        position: {
          lat: parseFloat(element.lat),
          lng: parseFloat(element.lng),
        },
        label: {
          color: 'red',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: element.placeName,
        options: { animation: google.maps.Animation.DROP },
      });
    });
  }

  MarkerClick(data: any) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${data.position.lat},${data.position.lng}`)
  }
}
