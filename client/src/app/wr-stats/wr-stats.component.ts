import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';
import * as moment from 'moment';
import { XY } from '../models/xy'


@Component({
  selector: 'app-wr-stats',
  templateUrl: './wr-stats.component.html',
  styleUrls: ['./wr-stats.component.css']
})
export class WrStatsComponent implements OnInit {

  todayStats: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];



  type = 'line';

  startDate: Date;

  data = null;

  options = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  constructor(private statService: StatService) { }


  setData() {

    var temp = new Array<XY>();

    for (var i = 0; i < this.thisWeekStats.length; i++) {
      console.log(this.thisWeekStats[i]);
      var t = new XY(new Date(this.thisWeekStats[i].date), this.thisWeekStats[i].count);
      temp.push(t);
    };

    this.data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: temp
      }]
    };

  }




  ngOnInit() {


    this.statService.getToday("WR")
      .subscribe(
      stats => { this.todayStats = stats; });


    this.statService.getThisWeek("WR")
      .subscribe(
      stats => {
        this.thisWeekStats = stats;

        this.startDate = stats[0].date;
        this.setData();
        console.log("Set Data");
      });

    this.statService.getLastWeek("WR")
      .subscribe(
      stats => {
        this.lastWeekStats = stats;
      });


  }



}
