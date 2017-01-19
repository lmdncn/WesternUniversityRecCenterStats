import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';
import * as moment from 'moment';
import { XY } from '../models/xy'


@Component({
  selector: 'app-vb-stats',
  templateUrl: './vb-stats.component.html',
  styleUrls: ['./vb-stats.component.css']
})
export class VbStatsComponent implements OnInit {

  //Stat Data
  todayStats: Stat[];
  todayStatsR: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];
  thisTimeLastWeek: Stat[];

  //Graph Data
  nameTag = "VBALL"
  daydata = null;
  dayoptions = null;
  type = 'line';
  weekstartDate: Date;
  weekdata = null;
  weekoptions = null;
  graphHeight = 50;

  constructor(private statService: StatService) { }

  buildDay() {
    var TD = new Array<XY>();
    for (var i = 0; i < this.todayStats.length; i++) {
      // console.log("Today: ", this.todayStats[i]);
      TD.push(new XY(new Date(this.todayStats[i].date), this.todayStats[i].count));
    };

    var LD = new Array<XY>();
    for (var i = 0; i < this.thisTimeLastWeek.length; i++) {
      // console.log("TTLW: ", this.thisTimeLastWeek[i]);
      LD.push(new XY(new Date(moment(this.thisTimeLastWeek[i].date).add(7, "days").toDate()), this.thisTimeLastWeek[i].count));
    };

    // -------------------------------- Today Graph Data ---------------------------------------------
    this.daydata = {
      datasets: [{
        label: 'Today',
        data: TD,
        backgroundColor: "rgba(81, 44, 115,0.6)",
        lineTension: 0,
        radius: 2.5,
        spanGaps: false,
      },
      {
        label: 'Last ' + moment().format("dddd"),
        data: LD,
        backgroundColor: "rgba(93, 90, 96,0.4)",
        //lineTension:0.2,
        radius: 2.5,
        spanGaps: false,
      }]
    };

    this.dayoptions = {
      legend:{
        display:false,
        labels:{
          boxWidth:100,
          fontSize:30,
          // fontStyle: ,
          // fontColor: ,
          // fontFamily: ,
          padding:15,
        },
      },
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            round: "minute",
            displayFormats: {
              hour: 'h a',
            },
            unitStepSize: 2,
            isoWeekday: true,
            max: moment().endOf("day"),
            min: moment.min(moment(this.todayStats[0].date).startOf("hour"),moment(this.thisTimeLastWeek[0].date).add(7,"days").startOf("hour")),
            tooltipFormat: "ddd, MMM D, h:mm a",
            unit: "hour"
          },
          ticks: {
            maxRotation: 0,
          },
          gridLines: {
            lineWidth: 4,
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: this.graphHeight,
          },
          scaleLabel:
          {
            display: false,
            labelString: "HeadCount",
          }
        }]
      },
      responsive: true,
    };
  }

  // Once all data arrives build the week graph
  buildWeek() {
    var TW = new Array<XY>();
    var lastMoment = moment(this.thisWeekStats[0].date);

    for (var i = 0; i < this.thisWeekStats.length; i++) {
      console.log("This Week: ", this.thisWeekStats[i]);

      while (moment(this.thisWeekStats[i].date) > lastMoment.add(4, 'hours'))//Gym Probably Closed
      {
        console.log("Adding Close");
        TW.push(new XY(new Date(moment(lastMoment).subtract(2, "hours").toDate()), -1));
        TW.push(new XY(new Date(lastMoment.toDate()), -1));
      }

      lastMoment = moment(this.thisWeekStats[i].date);


      var t = new XY(new Date(this.thisWeekStats[i].date), this.thisWeekStats[i].count);
      TW.push(t);
    };


    var LW = new Array<XY>();
    var lastMoment = moment(this.lastWeekStats[0].date)

    for (var i = 0; i < this.lastWeekStats.length; i++) {

      console.log("Last Week: ", this.lastWeekStats[i]);
      if (moment(this.lastWeekStats[i].date) > moment(lastMoment).add(4, 'hours')) {

        while (moment(this.lastWeekStats[i].date) > lastMoment.add(1, 'hours'))   //Gym Probably Closed
        {
          LW.push(new XY(new Date(lastMoment.toDate()), -1));
          lastMoment.add(1, "hours");
        }
      }

      lastMoment = moment(this.lastWeekStats[i].date);

      LW.push(new XY(new Date(moment(this.lastWeekStats[i].date).toDate()), this.lastWeekStats[i].count));

    };

    // --------------------------------- Week Graph Building ---------------------------------------------------
    this.weekdata = {
      datasets: [{
        label: "This Week",
        data: TW,
        backgroundColor: "rgba(81, 44, 115,0.6)",
        lineTension: 0,
        radius: 2,
        spanGaps: false,
      },
      {
        label: 'Last Week',
        data: LW,
        backgroundColor: "rgba(93, 90, 96,0.4)",
        //lineTension:0.2,
        radius: 2,
        spanGaps: false,
      }

      ]
    };

    this.weekoptions = {
      legend:{
        
        display:false,
        labels:{
          boxWidth:100,
          fontSize:30,
          // fontStyle: ,
          // fontColor: ,
          // fontFamily: ,
          padding:15,
        },
      },
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            round: "minute",
            displayFormats: {
              day: 'dddd, MMM D',
            },
            isoWeekday: true,
            max: moment().endOf("day").add(3, "days"),
            min: moment().startOf("day").subtract(3, "days"),
            tooltipFormat: "ddd, MMM D, h:mm a",
            unit: "day"
          },
          ticks: {
            labelOffset: 80,
            maxRotation: 0,

          },
          gridLines: {
            lineWidth: 4,
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: this.graphHeight,
          },
          scaleLabel:
          {
            display: false,
            labelString: "HeadCount",
          }
        }]
      },
      responsive: true,
    };
  }

  // ------------------------------------- Stat Service Get Calls --------------------------------
  ngOnInit() {
    this.statService.getToday(this.nameTag)
      .subscribe(
      stats => {
        this.todayStats = stats;
        this.todayStatsR = stats.slice();
        this.todayStatsR.reverse();
      }, null, () => {
        if (this.todayStats != null && this.todayStats.length < 1) {
          console.log("Morning Of = Closed");
          this.todayStats.push(new Stat(null, this.nameTag, -1, new Date(Date.now())));
        }
        this.getTTLW();
      });
    this.statService.getThisWeek(this.nameTag)
      .subscribe(
      stats => {
        this.thisWeekStats = stats;
          this.weekstartDate = stats[0].date;        
      }, null, () => {
        this.getLastWeekNext();
      });
  }
  //Called after getThisWeek
  getLastWeekNext() {
    this.statService.getLastWeek(this.nameTag)
      .subscribe(
      stats => {
        this.lastWeekStats = stats;
        console.log("Set Data");
      }, null, () => {

        this.lastWeekStats.forEach(element => {
          element.date = moment(element.date).add(7, "days").toDate();
        });
        this.buildWeek(); //Can finally build chart since data will be there
      });
  }
  getTTLW() {
    this.statService.getTTLW(this.nameTag)
      .subscribe(
      stats => {
        this.thisTimeLastWeek = stats;
      }, null, () => {
        if(this.todayStats[0].count!=-1){this.buildDay(); } //Can finally build chart since data will be there
      });
  }

}
