import { Component } from '@angular/core';

//Import Services for singleton init
// import{______} from "./services/_______";

//Import Models
//import {____} from './models/____';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.css"],
})

export class AppComponent{
  title:String = 'Campus Rec';

  constructor(){
  }

}
