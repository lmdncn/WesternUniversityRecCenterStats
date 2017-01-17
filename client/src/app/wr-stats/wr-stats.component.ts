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
        position: 'bottom',
        ticks:{
          callback:(v)=> moment(v).format('ddd, MMM D,  h:mm a')
        }
          
        
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 300
        }
      }]

    },
    responsive: true,
  };

  constructor(private statService: StatService) { }


  setData() {

    var TW = new Array<XY>();

    for (var i = 0; i < this.thisWeekStats.length; i++) {
      console.log("This Week: ", this.thisWeekStats[i]);
      var t = new XY(new Date(this.thisWeekStats[i].date), this.thisWeekStats[i].count);
      TW.push(t);
    };


    var LW = new Array<XY>();

    for (var i = 0; i < this.lastWeekStats.length; i++) {
      console.log("Last Week: ", this.lastWeekStats[i]);
      var t = new XY(new Date(moment(this.lastWeekStats[i].date).add(7, "days").toDate()), this.lastWeekStats[i].count);
      LW.push(t);
    };


    this.data = {
      datasets: [{
        label: 'This Week',
        data: TW,
        backgroundColor: "rgba(81, 44, 115,0.8)"
      },
      {
        label: 'Last Week',
        data: LW,
        backgroundColor: "rgba(93, 90, 96,0.2)"
      }

      ]
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

      });

    this.statService.getLastWeek("WR")
      .subscribe(
      stats => {
        this.lastWeekStats = stats;

        this.setData();
        console.log("Set Data");
      });


  }



}
