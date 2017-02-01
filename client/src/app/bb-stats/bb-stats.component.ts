import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { HoursService } from '../services/hours.service';
import { StatService } from '../services/stat.service';
import { Stat } from '../models/stat';
import * as moment from 'moment';
import { XY } from '../models/xy'


@Component({
  selector: 'app-bb-stats',
  templateUrl: './bb-stats.component.html',
  styleUrls: ['./bb-stats.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ]
})
export class BbStatsComponent implements OnInit {


  // hours data
  morningOf;
  title = "Drop-In Basketball";
  //Stat 
  tgapspan = true;
  todayStats: Stat[];
  todayStatsR: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];
  thisTimeLastWeek: Stat[];
  projectedTomorrowStats: Stat[];
  nxtProject: Stat[];

  //Graph Data
  nameTag = "BBALL"
  daydata = null;
  dayoptions = null;
  type = 'line';
  weekstartDate: Date;
  weekdata = null;
  weekoptions = null;  
  tomorrowdata = null;
  tomorrowoptions = null;
  graphMax = 100;


  dayOfWeek = moment().format("dddd");
  dayOfWeekT = moment().add(1, "day").format("dddd");
  thisweekstr = moment().subtract(4, "day").format("MMM D") + " to " + moment().add(3, "day").format("MMM D");
  mobile = window.matchMedia('(max-width: 767px)').matches;

  constructor(private statService: StatService, private hoursService: HoursService) { }

  // ------------------------------------- Stat Service Get Calls --------------------------------
  ngOnInit() {

    this.setupProjectedBarData();

    //Setsup day data and builds graph when done
    this.setupTodayData();

    //Both On Open and Close
    this.setupThisWeekData(); //Setsup week data and builds graph when done

    //Set tomorrow graph
    this.setupTomorrowProjectedData();

  }



  setupThisWeekData() {

    this.statService.getThisWeek(this.nameTag)
      .subscribe(
      stats => {
        this.thisWeekStats = stats;
        this.weekstartDate = stats[0].date;
      }, null, () => {
        this.setupLastWeekData();
      });
  }

  setupTodayData() {
    // console.log("Setting up today data");
    this.statService.getToday(this.nameTag)
      .subscribe(
      stats => {
        // console.log("Today data in");
        this.todayStats = stats;
        this.todayStatsR = stats.slice();
        this.todayStatsR.reverse();
      }, null, () => {
        if (this.todayStats != null && this.todayStats.length < 1) {
          // console.log("Morning Of = Closed");
          this.todayStats.push(new Stat(null, this.nameTag, null, new Date(Date.now())));
        }
        // console.log("Today when done");
        this.setupTtlwData()
      });

  }

  setupLastWeekData() {
    this.statService.getLastWeek(this.nameTag)
      .subscribe(
      stats => {
        this.lastWeekStats = stats;
        // console.log("Set Data");
      }, null, () => {
        this.lastWeekStats.forEach(element => {
          element.date = moment(element.date).add(7, "days").toDate();
        });
        this.buildWeekGraph();
      });
  }

  setupTtlwData() {

    // console.log("Setting ttlw data");
    this.statService.getTTLW(this.nameTag)
      .subscribe(
      stats => {
        this.thisTimeLastWeek = stats;
      }, null, () => {
        this.buildDayGraph()
      });
  }

  setupProjectedBarData() {
    // console.log("setup bar data proj");
    this.statService.getProjected(this.nameTag)
      .subscribe(
      stats => {
        this.nxtProject = stats;
        // console.log("Projected! : ", stats);
      }, null, () => {
        this.nxtProject.forEach(element => {
          element.date = moment(element.date).add(7, "days").toDate();
        });
      });
  }

  buildDayGraph() {
    // console.log("Building Day Graph:", this.todayStats);
    var TD = new Array<XY>();
    for (var i = 0; i < this.todayStats.length; i++) {
      // console.log("Today: ", this.todayStats[i]);


      if (this.todayStats[i].count == -2)//IMS
      {
        var t = new XY(new Date(this.todayStats[i].date), null);
      } else {
        var t = new XY(new Date(this.todayStats[i].date), this.todayStats[i].count);
      }
      TD.push(t);
    };

    var LD = new Array<XY>();
    for (var i = 0; i < this.thisTimeLastWeek.length; i++) {
      // console.log("TTLW: ", this.thisTimeLastWeek[i]);

      if (this.thisTimeLastWeek[i].count == -2)//IMS
      {
        var t = new XY(new Date(moment(this.thisTimeLastWeek[i].date).add(7, "days").toDate()), null);
      } else {
        var t = new XY(new Date(moment(this.thisTimeLastWeek[i].date).add(7, "days").toDate()), this.thisTimeLastWeek[i].count);
      }

      LD.push(t);
    };


    // -------------------------------- Today Graph Data ---------------------------------------------
    this.daydata = {
      datasets: [{
        label: 'Today',
        data: TD,
        backgroundColor: "rgba(81, 44, 115,0.6)",
        lineTension: 0,
        radius: 3,
        spanGaps: this.tgapspan,
      },
      {
        label: 'Projected',
        data: LD,
        backgroundColor: "rgba(93, 90, 96,0.4)",
        //lineTension:0.2,
        radius: 2.5,
        spanGaps: this.tgapspan,
      }]
    };

    this.dayoptions = {
      legend: {
        display: false,
        labels: {
          boxWidth: 100,
          fontSize: 30,
          // fontStyle: ,
          // fontColor: ,
          // fontFamily: ,
          padding: 15,
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
            max: this.hoursService.closeMoment,
            min: this.hoursService.openMoment,
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
            max: this.graphMax
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
  buildWeekGraph() {
    var TW = new Array<XY>();

    var lastMoment = moment(this.thisWeekStats[0].date)

    for (var i = 0; i < this.thisWeekStats.length; i++) {
      //console.log("This Week: ", this.thisWeekStats[i]);

      if (moment(this.thisWeekStats[i].date) > moment(lastMoment).add(4, 'hours')) {
        TW.push(new XY(new Date(lastMoment.toDate()), null));
      }

      lastMoment = moment(this.thisWeekStats[i].date);




      if (this.thisWeekStats[i].count == -2)//IMS
      {
        var t = new XY(new Date(this.thisWeekStats[i].date), null);
      } else {
        var t = new XY(new Date(this.thisWeekStats[i].date), this.thisWeekStats[i].count);
      }
      TW.push(t);
    };


    var LW = new Array<XY>();
    var lastMoment = moment(this.lastWeekStats[0].date)

    for (var i = 0; i < this.lastWeekStats.length; i++) {

      if (moment(this.lastWeekStats[i].date) > moment(lastMoment).add(4, 'hours')) {
        LW.push(new XY(new Date(lastMoment.toDate()), null));
      }

      lastMoment = moment(this.lastWeekStats[i].date);



      if (this.lastWeekStats[i].count == -2)//IMS
      {
        var t = new XY(new Date(this.lastWeekStats[i].date), null);
      } else {
        var t = new XY(new Date(this.lastWeekStats[i].date), this.lastWeekStats[i].count);
      }

      LW.push(t);

    };

    // --------------------------------- Week Graph Building ---------------------------------------------------
    this.weekdata = {
      datasets: [{
        label: "This Week",
        data: TW,
        backgroundColor: "rgba(81, 44, 115,0.6)",
        lineTension: 0,
        radius: 1.5,
        spanGaps: false,
      },
      {
        label: 'Projected',
        data: LW,
        backgroundColor: "rgba(93, 90, 96,0.4)",
        //lineTension:0.2,
        radius: 2,
        spanGaps: false,
      }

      ]
    };

    this.weekoptions = {
      legend: {

        display: false,
        labels: {
          boxWidth: 100,
          fontSize: 30,
          // fontStyle: ,
          // fontColor: ,
          // fontFamily: ,
          padding: 15,
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
            max: this.graphMax
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

  setupTomorrowProjectedData() {
    this.statService.getProjectedTomorrow(this.nameTag)
      .subscribe(
      stats => {
        this.projectedTomorrowStats = stats;
      }, null, () => {
        this.projectedTomorrowStats.forEach(element => {
          element.date = moment(element.date).add(7, "days").toDate();
        });
        this.buildProjectedTomorrowGraph();
        // console.log("PROJECTED: ", this.projectedTomorrowStats);
      });
  }

  buildProjectedTomorrowGraph() {

    var LD = new Array<XY>();
    for (var i = 0; i < this.projectedTomorrowStats.length; i++) {
      // console.log("TTLW: ", this.projectedTomorrowStats[i]);
      if (this.projectedTomorrowStats[i].count == -2)//IMS
      {
        var t = new XY(new Date(moment(this.projectedTomorrowStats[i].date).toDate()), null);
      } else {
        var t = new XY(new Date(moment(this.projectedTomorrowStats[i].date).toDate()), this.projectedTomorrowStats[i].count);
      }

      LD.push(t);
    };

    // -------------------------------- Tomorrow Graph Data ---------------------------------------------
    this.tomorrowdata = {
      datasets: [
        {
          label: 'Projected',
          data: LD,
          backgroundColor: "rgba(93, 90, 96,0.4)",
          //lineTension:0.2,
          radius: 3,
          spanGaps: this.tgapspan,
        }]
    };

    this.tomorrowoptions = {
      legend: {
        display: false,
        labels: {
          boxWidth: 100,
          fontSize: 30,
          // fontStyle: ,
          // fontColor: ,
          // fontFamily: ,
          padding: 15,
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
            max: this.hoursService.tomorrowCloseMoment,
            min: this.hoursService.tomorrowOpenMoment,
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
            max: this.graphMax
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
}
