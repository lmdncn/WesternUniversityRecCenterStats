import { Component, OnInit, Input } from '@angular/core';
import {Hours} from "../models/hours";
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() hours:Hours;
  @Input() mobile;
  DOW = moment().format("dddd");
  load = false;
  constructor() { }

  ngOnInit() {
  }

  DOWCheck(str){

    return str == this.DOW;
  }
}
