import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';
import {Stat} from '../models/stat';

@Component({
  selector: 'app-wr-stats',
  templateUrl: './wr-stats.component.html',
  styleUrls: ['./wr-stats.component.css']
})
export class WrStatsComponent implements OnInit {

  todayStats: Stat[];

  constructor(private statService: StatService) { }

  ngOnInit() {

this.statService.getThisWeek("WR")
      .subscribe(
      stats => { this.todayStats = stats; });

  }

  check(){
    console.log(JSON.stringify(this.todayStats));
  }
}
