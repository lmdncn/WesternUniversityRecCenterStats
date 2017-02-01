import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Hours } from '../models/hours';
import * as moment from 'moment';

@Injectable()
export class HoursService {

  constructor(private http: Http) {

    this.getHours().subscribe(
      hours => {
        this.hours = hours[0];
      }, null, () => {
        this.setOpenClose();
      });

  }

  hours: Hours;
  DOW = moment().format("dddd");
  DOWnames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  DOWi; //Sunday is 0, Saturday is 6
  open; //string format
  close; //string format
  open24; //int format
  close24; //int format
  openMoment;
  closeMoment;
  realtionToClose; //before or after being open (day of)
  tomorrowOpen;
  tomorrowClose;
  tomorrowOpen24;
  tomorrowClose24
  tomorrowOpenMoment;
  tomorrowCloseMoment;
  isOpen;



  closedCheck() {
    // console.log("Open moment: ",this.openMoment);
    // console.log("Close moment: ",this.closeMoment);
    this.openMoment = moment().startOf("day").add(this.open24, "hours");
    this.closeMoment = moment().startOf("day").add(this.close24, "hours");

    //rec center closed
    if (moment().isBefore(this.openMoment)) {
      //Before Open
      // console.log("Before open");
      this.realtionToClose = "before";
    }
    if (moment().isAfter(this.closeMoment)) {
      //After being Open
      // console.log("After close");
      this.realtionToClose = "after";
    }

    if (moment().isBetween(this.openMoment, this.closeMoment)) {
      //rec center is open
      this.realtionToClose = "open";
      // console.log("Curently open", this.realtionToClose);
      return false;
    }


    return true;
  }



  setOpenClose() {
    this.DOWi = this.DOWnames.indexOf(this.DOW);
    switch (this.DOWi) {

      case 0: //Sunday
        this.open = this.hours.sunO.hour.toString() + this.hours.sunO.f;
        this.close = this.hours.sunC.hour.toString() + this.hours.sunC.f;
        this.tomorrowOpen = this.hours.monO.hour.toString() + this.hours.monO.f;
        this.tomorrowClose = this.hours.monC.hour.toString() + this.hours.monC.f;
        break;

      case 1: //Monday
        this.open = this.hours.monO.hour.toString() + this.hours.monO.f;
        this.close = this.hours.monC.hour.toString() + this.hours.monC.f;
        this.tomorrowOpen = this.hours.tueO.hour.toString() + this.hours.tueO.f;
        this.tomorrowClose = this.hours.tuesC.hour.toString() + this.hours.tuesC.f;
        break;

      case 2: //Tuesday
        this.open = this.hours.tueO.hour.toString() + this.hours.tueO.f;
        this.close = this.hours.tuesC.hour.toString() + this.hours.tuesC.f;
        this.tomorrowOpen = this.hours.wedO.hour.toString() + this.hours.wedO.f;
        this.tomorrowClose = this.hours.wedC.hour.toString() + this.hours.wedC.f;
        break;

      case 3: //Wednesday
        this.open = this.hours.wedO.hour.toString() + this.hours.wedO.f;
        this.close = this.hours.wedC.hour.toString() + this.hours.wedC.f;
        this.tomorrowOpen = this.hours.thuO.hour.toString() + this.hours.thuO.f;
        this.tomorrowClose = this.hours.thuC.hour.toString() + this.hours.thuC.f;
        break;

      case 4: //THursday
        this.open = this.hours.thuO.hour.toString() + this.hours.thuO.f;
        this.close = this.hours.thuC.hour.toString() + this.hours.thuC.f;
        this.tomorrowOpen = this.hours.friO.hour.toString() + this.hours.friO.f;
        this.tomorrowClose = this.hours.friC.hour.toString() + this.hours.friC.f;
        break;

      case 5: //Friday
        this.open = this.hours.friO.hour.toString() + this.hours.friO.f;
        this.close = this.hours.friC.hour.toString() + this.hours.friC.f;
        this.tomorrowOpen = this.hours.satO.hour.toString() + this.hours.satO.f;
        this.tomorrowClose = this.hours.satC.hour.toString() + this.hours.satC.f;
        break;

      case 6: //Saturday
        this.open = this.hours.satO.hour.toString() + this.hours.satO.f;
        this.close = this.hours.satC.hour.toString() + this.hours.satC.f;
        this.tomorrowOpen = this.hours.sunO.hour.toString() + this.hours.sunO.f;
        this.tomorrowClose = this.hours.sunC.hour.toString() + this.hours.sunC.f;
        break;

      default:
        this.open = "6AM";
        this.close = "12AM";
        this.tomorrowOpen = "6AM";
        this.tomorrowClose = "12AM";
    }
    // console.log("open is",this.open);
    // console.log("close is",this.close);
    this.setOpenClose24();
    this.setTomorrowOpenClose24();
    this.isOpen = !this.closedCheck();
  }



  setOpenClose24() {
    // console.log("Setting hours: ", this.open, this.close);
    switch (this.open) {
      case "5AM": this.open24 = 5;
        break;
      case "6AM": this.open24 = 6;
        break;
      case "7AM": this.open24 = 7;
        break;
      case "8AM": this.open24 = 8;
        break;
      case "9AM": this.open24 = 9;
        break;
      case "10AM": this.open24 = 10;
        break;
      case "11AM": this.open24 = 11;
        break;
    }

    switch (this.close) {
      case "12AM": this.close24 = 12 + 12;
        break;
      case "6PM": this.close24 = 12 + 6;
        break;
      case "7PM": this.close24 = 12 + 7;
        break;
      case "8PM": this.close24 = 12 + 8;
        break;
      case "9PM": this.close24 = 12 + 9;
        break;
      case "10PM": this.close24 = 12 + 10;
        break;
      case "11PM": this.close24 = 12 + 11;
        break;
    }

    this.openMoment = moment().startOf("day").add(this.open24, "hours");
    this.closeMoment = moment().startOf("day").add(this.close24, "hours");

  }

  setTomorrowOpenClose24() {

    switch (this.tomorrowOpen) {
      case "5AM": this.tomorrowOpen24 = 5;
        break;
      case "6AM": this.tomorrowOpen24 = 6;
        break;
      case "7AM": this.tomorrowOpen24 = 7;
        break;
      case "8AM": this.tomorrowOpen24 = 8;
        break;
      case "9AM": this.tomorrowOpen24 = 9;
        break;
      case "10AM": this.tomorrowOpen24 = 10;
        break;
      case "11AM": this.tomorrowOpen24 = 11;
        break;
    }

    switch (this.tomorrowClose) {
      case "12AM": this.tomorrowClose24 = 12 + 12;
        break;
      case "6PM": this.tomorrowClose24 = 12 + 6;
        break;
      case "7PM": this.tomorrowClose24 = 12 + 7;
        break;
      case "8PM": this.tomorrowClose24 = 12 + 8;
        break;
      case "9PM": this.tomorrowClose24 = 12 + 9;
        break;
      case "10PM": this.tomorrowClose24 = 12 + 10;
        break;
      case "11PM": this.tomorrowClose24 = 12 + 11;
        break;
    }

    this.tomorrowOpenMoment = moment().startOf("day").add(1, "day").add(this.tomorrowOpen24, "hours");
    this.tomorrowCloseMoment = moment().startOf("day").add(1, "day").add(this.tomorrowClose24, "hours");

  }

  getHours(): Observable<Hours> {

    return this.http.get("api/hours").map((res) => res.json()).catch(this.handleError);

  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure

    // console.log("Error with tab retrieval");

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }





}
