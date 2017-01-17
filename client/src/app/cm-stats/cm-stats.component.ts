import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';

@Component({
  selector: 'app-cm-stats',
  templateUrl: './cm-stats.component.html',
  styleUrls: ['./cm-stats.component.css']
})
export class CmStatsComponent implements OnInit {

  todayStats: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];

  constructor(private statService: StatService) { }

  ngOnInit() {

    this.statService.getToday("CM")
      .subscribe(
      stats => {
      this.todayStats = stats;
        if (this.todayStats.length < 1) {
          console.log("Morning Of = Closed");
          this.todayStats.push(new Stat(null, "CM", -1, new Date(Date.now())));
        }
      });

    this.statService.getThisWeek("CM")
      .subscribe(
      stats => { this.thisWeekStats = stats; });

    this.statService.getLastWeek("CM")
      .subscribe(
      stats => { this.lastWeekStats = stats; });
  }

}
