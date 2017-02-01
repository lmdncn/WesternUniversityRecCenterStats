import { Component, OnInit } from '@angular/core';
//Import Services for singleton init
// import{______} from "./services/_______";
//Import Models
//import {____} from './models/____';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit {

  title: String = 'Campus Rec';
 


  mobile = window.matchMedia('(max-width: 767px)').matches;

  constructor() {
  }

  ngOnInit() {

    
    


  }


}
