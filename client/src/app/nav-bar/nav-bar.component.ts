import { Component, OnInit } from '@angular/core';

import { StatService } from '../services/stat.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {



  WRCurrentCount: number;
  CMCurrentCount: number;
  BBCurrentCount: number;
  VBCurrentCount: number;
  BDCurrentCount: number;
  HKCurrentCount: number;


  constructor(private statService: StatService) { }

  ngOnInit() {

    this.statService.getCurrentCount("WR")
      .subscribe(
      stat => { this.WRCurrentCount = stat.count; });

       this.statService.getCurrentCount("CM")
      .subscribe(
      stat => { this.CMCurrentCount = stat.count; });

  }

}
