import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';

@Component({
  selector: 'app-wr-stats',
  templateUrl: './wr-stats.component.html',
  styleUrls: ['./wr-stats.component.css']
})
export class WrStatsComponent implements OnInit {

  todayStats: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];

  thisWeekCount: number[];
  thisWeekDays: Date[];
  lastWeekCount: number[];
  lastWeekDays: Date[];

  type = 'line';
  data = {
    labels: this.thisWeekDays,
    datasets: [
      {
        label: "Current Week",
        data: this.thisWeekCount
      }//,
      // {
      //   label: "Previous Week",
      //   data: this.lastWeekCount
      // }

    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private statService: StatService) { }

  ngOnInit() {

    this.statService.getToday("WR")
      .subscribe(
      stats => { this.todayStats = stats; });

    this.statService.getThisWeek("WR")
      .subscribe(
      stats => { 
        this.thisWeekStats = stats; 
        this.thisWeekCount = this.getCount(stats)
        this.thisWeekDays = this.getDays(stats)
        this.data.labels = this.getDays(stats);
        this.data.datasets[0].data = this.getCount(stats);
        console.log(this.thisWeekDays);
        console.log(this.thisWeekCount);
      });

    this.statService.getLastWeek("WR")
      .subscribe(
      stats => { 
        this.lastWeekStats = stats; 
        this.lastWeekStats = this.getCount(stats)
        //this.lastWeekDays = this.getDays(stats)
      });
  }

  check() {
    console.log(JSON.stringify(this.todayStats));
  }

  // Gets the number of people from the stats
  getCount(stats: Stat[]) {
    let count = [];
    for (var i = 0; i < stats.length; i++) {
      count[i] = stats[i].count;
    }
    return count;
  };

  // Gets the number of people from the stats
  getDays(stats: Stat[]) {
    let days: Date[] = [];
    for (var i = 0; i < stats.length; i++) {
      days[i] = stats[i].date;
    }
    return days;
  };
}
