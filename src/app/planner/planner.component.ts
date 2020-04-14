import {Component, ElementRef, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Route} from '../model/route';
import {Plan} from '../model/plan';
import {CookieService} from 'ngx-cookie';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import LatLng = google.maps.LatLng;

export interface PlaceRequest  {
  location: LatLng;
  radius: number;
  type: string;
}

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  @ViewChild('map', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  @ViewChild('from', {static: false})
  public fromElementeRef: ElementRef;

  @ViewChild('to', {static: false})
  public toElementeRef: ElementRef;

  public fromControl: FormControl;
  public toControl: FormControl;

  public positionInit = {
    center: {lat: 0, lng: 0},
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    travelMode: google.maps.TravelMode.DRIVING
  };

  public stops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public step = -1;
  public distanceKm: string;
  public durationHr: string;


  public route: Route;
  public plans = Array<Plan>();
  private markers = [];

  public start = false;
  public target = false;
  public planned = false;

  public loading = false;
  public registered = false;

  private keyUser = '&I%U%$234';
  private userId: number;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private cookieService: CookieService,
              public dialog: MatDialog) {
    this.route = new Route(null, null, null, null, null, 0, 0, 0,
      0, 0, null);
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.userId = this.getUserCookie(this.keyUser);
      /*  get del user y asignarlo a route */
      /*this.route.user =*/
      this.loading = false;
    }, 3000);

    this.fromControl = new FormControl();
    this.toControl = new FormControl();
    this.setCurrentPosition();
    this.onLoadAutoComplete();
  }

  getUserCookie(key: string) {
    const cookie = this.cookieService.get(key);
    this.registered = false;
    if ((cookie === undefined) || (cookie) === '') {
      this.registered = true;
      return -1;
    }
    return Number(cookie);
  }

  initMap() {
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
          this.setPlan(this.route.startLat, this.route.startLng, place.name, true, 0, 0);
          this.setMarker(this.route.startLat, this.route.startLng, place.name, 'yellow', true);

          this.start = true;
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
          this.setPlan(this.route.targetLat, this.route.targetLng, place.name, true, -1, -1);
          this.setMarker(this.route.targetLat, this.route.targetLng, place.name, 'green', true);
          this.target = true;
        });
      });
    });
  }

  setMarker(lat, lng, label, color: string, isBonuce) {
    let url = 'http://maps.google.com/mapfiles/ms/icons/';
    url += color + '-dot.png';

    const marker = new google.maps.Marker({
      map: this.map,
      title: label,
      draggable: false,
      animation: isBonuce ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP,
      position: {lat, lng},
      label,
      icon: url
    });

    this.markers.push(marker);
  }


  setPlan(lat, lng, label, isLast, km, time){
    const plan = new Plan(null, null, label, lat, lng, km, time, this.plans.length, 1);

    if (isLast) {
      this.plans.push(plan);
    } else {
      this.plans.splice(this.plans.length - 1, 0, plan);
    }
  }

  onDrawRoute() {

    this.planned = true;

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

  processDirection(directions) {

    let sumTime = 0;
    let sumKm = 0;
    let time = 0;
    let km = 0;
    let stop = 1;
    this.loading = true;

    for (const direction of directions) {
      sumTime += direction.duration.value;
      sumKm += direction.distance.value;
      time = ((sumTime / 60) / 60);
      km = sumKm / 1000;

      if (time >= this.route.hourStop) {
        this.setPlan(direction.end_location.lat(), direction.end_location.lng(), 'stop: ' + stop + ' km: ' + km + ' time: ' + time,
          false, sumKm, sumTime);
        this.setMarker(direction.end_location.lat(), direction.end_location.lng(), directions.name, 'red', false);
        sumTime = 0;
        sumKm = 0;
      }
    }
    this.loading = false;
  }

  public getDistanceMatrix(startLat, startLng, targetLat, targetLng) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(startLat, startLng)],
        destinations: [new google.maps.LatLng(targetLat, targetLng)],
        travelMode: google.maps.TravelMode.DRIVING
      }, (results: any) => {
        console.log(results);
        this.distanceKm = results.rows[0].elements[0].distance.text;
        this.durationHr = results.rows[0].elements[0].duration.text;
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getInfo(plan) {

  }

  setPlanState(plan) {
    plan.state = plan.state === 1 ? 2 : 1;
  }

  getPlace(plan, type) {
    const place = new google.maps.LatLng(plan.lat, plan.lng);

    const request = {
      location: place,
      radius: 1000,
      type,
    };

    this.openDialogPlace(request);
  }

  onSave() {

  }

  openDialogPlace(request): void {
    const dialogRef = this.dialog.open(PlannerViewPlaceComponent, {
      data: request
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'app-planner-component-view-place',
  templateUrl: 'planner.view.place.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerViewPlaceComponent implements OnInit {

  @ViewChild('map', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  public loading = false;
  private markers = [];

  constructor(
    public dialogRef: MatDialogRef<PlannerViewPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public request: PlaceRequest) {}


  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loadPlace();
      this.loading = false;
    }, 3000);
  }

  loadPlace(){

    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.request.location,
      zoom: 15
    });

    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(this.request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const placeType of results) {
          this.setMarker(placeType.geometry.location.lat(), placeType.geometry.location.lng(), placeType.name, 'blue', true);
        }
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  setMarker(lat, lng, label, color: string, isBonuce) {
    let url = 'http://maps.google.com/mapfiles/ms/icons/';
    url += color + '-dot.png';

    const marker = new google.maps.Marker({
      map: this.map,
      title: label,
      draggable: false,
      animation: isBonuce ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP,
      position: {lat, lng},
      label,
      icon: url
    });

    this.markers.push(marker);
  }

}
