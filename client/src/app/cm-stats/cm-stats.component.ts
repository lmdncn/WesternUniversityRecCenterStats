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
      stats => { this.todayStats = stats; });

    this.statService.getThisWeek("CM")
      .subscribe(
      stats => { this.thisWeekStats = stats; });

    this.statService.getLastWeek("CM")
      .subscribe(
      stats => { this.lastWeekStats = stats; });
  }

  getProjected(){
    
  }

}
