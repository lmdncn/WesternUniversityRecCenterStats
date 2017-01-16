import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';


@Component({
  selector: 'app-bb-stats',
  templateUrl: './bb-stats.component.html',
  styleUrls: ['./bb-stats.component.css']
})
export class BbStatsComponent implements OnInit {
  todayStats: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];

  constructor(private statService: StatService) { }

  ngOnInit() {

    this.statService.getToday("BBALL")
      .subscribe(
      stats => { this.todayStats = stats; });

    this.statService.getThisWeek("BBALL")
      .subscribe(
      stats => { this.thisWeekStats = stats; });

    this.statService.getLastWeek("BBALL")
      .subscribe(
      stats => { this.lastWeekStats = stats; });

  }

}
