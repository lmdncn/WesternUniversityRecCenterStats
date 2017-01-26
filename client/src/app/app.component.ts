import { Component,OnInit } from '@angular/core';
import {Hours} from "./models/hours";
import { StatService } from './services/stat.service';
//Import Services for singleton init
// import{______} from "./services/_______";

//Import Models
//import {____} from './models/____';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit{

  hours:Hours;
  title:String = 'Campus Rec';

  mobile = window.matchMedia('(max-width: 767px)').matches;

  constructor(private statService: StatService){
  }

  ngOnInit() {
   this.statService.getHours().subscribe(
      hours => {
        this.hours = hours[0];
      }, null, () => {   
        });



}


}
