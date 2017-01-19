import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StatService } from '../services/stat.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {



  WRCurrentCount: number;
  CMCurrentCount: number;
  BBALLCurrentCount: number;
  VBALLCurrentCount: number;
  BDMTCurrentCount: number;
  FUTSCurrentCount: number;
  closed: boolean;
  close: number;
  open: number;

  constructor(private statService: StatService) { }

  ngOnInit() {
    this.closed = this.closedCheck();
    if(!this.closed){
    this.statService.getCurrentCount("WR")
      .subscribe(
      stat => { this.WRCurrentCount = stat.count; });
    this.statService.getCurrentCount("CM")
      .subscribe(
      stat => { this.CMCurrentCount = stat.count; });
    this.statService.getCurrentCount("BBALL")
      .subscribe(
      stat => { this.BBALLCurrentCount = stat.count; });
    this.statService.getCurrentCount("VBALL")
      .subscribe(
      stat => { this.VBALLCurrentCount = stat.count; });
    this.statService.getCurrentCount("BDMT")
      .subscribe(
      stat => { this.BDMTCurrentCount = stat.count; });
    this.statService.getCurrentCount("FUTS")
      .subscribe(
      stat => { this.FUTSCurrentCount = stat.count; });
    }
  }

  closedCheck() {
    if (moment().isBetween(moment().startOf("day").add(this.open, "hours"), moment().startOf("day").add(this.close, "hours"))) {
      //rec center is open
      return false;
    }
    //rec center closed
    return true;
  }

}
