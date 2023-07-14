import { Component } from '@angular/core';
declare var $: any;
declare const google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agm';
  map: any;
  zoom = 16;
  poly: any;
  lat: number = 30.375320;
  lng: number = 69.345116;
  // var :latLngArray =[];
  latLngArray:{lat:number, lng:number}[]=[];
  constructor() { }
  ngOnInit() {
    google.maps.event.addDomListener(window, 'load', this.initialize.bind(this));
  }
  drawFreeHand() {
    console.log('draw');

    //the polygon
    this.poly = new google.maps.Polyline({ map: this.map, clickable: false });
    //move-listener
    const move = google.maps.event.addListener(this.map, 'mousemove', (e: any) => {
      // console.log('move');
      this.poly.getPath().push(e.latLng);
    
      
      // push Latitude and longitude values to the array 
      this.latLngArray.push({ lat: e.latLng.lat(), lng: e.latLng.lng() });
     
      
    });

    //mouseup-listener
    google.maps.event.addListenerOnce(this.map, 'mouseup', (e: any) => {
      console.log("draw");
      google.maps.event.removeListener(move);
      console.log('mouseend', this.latLngArray)
      var path = this.poly.getPath();
      this.poly.setMap(null);
      this.poly = new google.maps.Polygon({ map: this.map, path: path });
      google.maps.event.clearListeners(this.map.getDiv(), 'mousedown');
      this.map.setOptions({
        draggable: true,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
      });
    });
  }
  initialize() {
    console.log('initialize', "hello");
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(52.5498783, 13.425209099999961),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    //draw
    $("#drawpoly button").click((e: any) => {
      console.log("Draw");
      e.preventDefault();
      this.map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
      });
      google.maps.event.addDomListener(this.map.getDiv(), 'mousedown', (e: any) => {
        console.log('drawFreeHand');
        this.drawFreeHand()
      });
    });
  }
}