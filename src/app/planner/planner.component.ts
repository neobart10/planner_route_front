import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Route} from '../model/route';
import {Plan} from '../model/plan';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  @ViewChild('map', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  @ViewChild('from', {static: false})
  public fromElementeRef: ElementRef;

  @ViewChild('to', {static: false})
  public toElementeRef: ElementRef;

  public fromControl: FormControl;
  public toControl: FormControl;

  public positionInit = {
    center: { lat: 0, lng: 0},
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    travelMode: google.maps.TravelMode.DRIVING};

  public stops = [1, 2, 3, 4, 5, 6, 7 , 8, 9, 10, 11, 12];
  public stop;

  private route: Route;
  private plans = Array<Plan>();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.route = new Route(null, null, null, null, null, 0, 0, 0,
      0, 0, null);
  }

  ngOnInit(): void {
    this.fromControl = new FormControl();
    this.toControl = new FormControl();
    this.setCurrentPosition();
    this.onLoadAutoComplete();
  }

  initMap(){
    this.map = new google.maps.Map(document.getElementById('map'), this.positionInit);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.positionInit.center.lat = position.coords.latitude;
        this.positionInit.center.lng = position.coords.longitude;
        this.initMap();
      });
    }
  }

  onLoadAutoComplete() {

    this.mapsAPILoader.load().then(() => {

      const from = new google.maps.places.Autocomplete(this.fromElementeRef.nativeElement, {
        types: [],
        componentRestrictions: {country: 'CO'}
      });

      from.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = from.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.route.description = place.name;
          this.route.startDescription = place.name;
          this.route.startLat = place.geometry.location.lat();
          this.route.startLng = place.geometry.location.lng();
          this.setMarker(this.route.startLat, this.route.startLng, 'from', 'yellow', true);
        });
      });

      const to = new google.maps.places.Autocomplete(this.toElementeRef.nativeElement, {
        types: [],
        componentRestrictions: {country: 'CO'}
      });

      to.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = to.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.route.description = this.route.description + ' & ' + place.name;
          this.route.targetDescription = place.name;
          this.route.targetLat = place.geometry.location.lat();
          this.route.targetLng = place.geometry.location.lng();
          this.setMarker(this.route.targetLat, this.route.targetLng, 'to', 'green', true);
          console.log(this.route);
        });
      });
    });
  }

  setMarker(lat, lng, label, color: string, isBonuce){
    let url = 'http://maps.google.com/mapfiles/ms/icons/';
    url += color + '-dot.png';

    const marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: isBonuce ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP,
      position: {lat, lng},
      label,
      icon: url
    });
  }

  onDrawRoute(){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });

    directionsRenderer.setMap(this.map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);

  }

  calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
      {
        origin: {lat: this.route.startLat, lng: this.route.startLng},
        destination: {lat: this.route.targetLat, lng: this.route.targetLng},
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          this.processDirection(directionsRenderer.getDirections().routes[0].legs[0].steps);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

  processDirection(directions){

    let sumTime = 0;
    let sumKm = 0;
    let time = 0;
    let km = 0;

    console.log(directions);

    for (const direction of directions){
      sumTime += direction.duration.value;
      sumKm += direction.distance.value;
      time = ((sumTime / 60) / 60);
      km = sumKm / 1000;

      if ( time  >= this.stop) {
        sumTime = 0;
        sumKm = 0;

        this.setMarker(direction.end_location.lat(), direction.end_location.lng(), '', 'red', false);

      }
    }
  }
}
