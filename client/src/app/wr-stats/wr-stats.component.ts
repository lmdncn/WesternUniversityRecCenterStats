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
  todayStatsR: Stat[];
  thisWeekStats: Stat[];
  lastWeekStats: Stat[];
  thisTimeLastWeek: Stat[];


  daydata = null;

  dayoptions = null;


  type = 'line';

  weekstartDate: Date;

  weekdata = null;

  weekoptions = null;

  constructor(private statService: StatService) { }

  buildDay() {

    var TD = new Array<XY>();

    for (var i = 0; i < this.todayStats.length; i++) {
      console.log("Today: ", this.todayStats[i]);
      var t = new XY(new Date(this.todayStats[i].date), this.todayStats[i].count);
      TD.push(t);
    };


    var LD = new Array<XY>();

    for (var i = 0; i < this.thisTimeLastWeek.length; i++) {
      console.log("TTLW: ", this.thisTimeLastWeek[i]);
      LD.push(new XY(new Date(moment(this.thisTimeLastWeek[i].date).add(7, "days").toDate()), this.thisTimeLastWeek[i].count));

    };


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
        label: 'Last Week Today',
        data: LD,
        backgroundColor: "rgba(93, 90, 96,0.4)",
        //lineTension:0.2,
        radius: 2.5,
        spanGaps: false,
      }

      ]
    };

    this.dayoptions = {
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
            min: moment(this.todayStats[0].date).startOf("hour"),

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
            max: 300
          },
          scaleLabel:
          {
            display: true,
            labelString: "HeadCount",
          }
        }]

      },
      responsive: true,


    };

  }


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
      if (moment(this.lastWeekStats[i].date)> moment(lastMoment).add(4, 'hours')) {

        while (moment(this.lastWeekStats[i].date) > lastMoment.add(1, 'hours'))   //Gym Probably Closed
        {
          LW.push(new XY(new Date(lastMoment.toDate()), -1));
          lastMoment.add(1, "hours");
        }
      }

      lastMoment = moment(this.lastWeekStats[i].date);

      LW.push(new XY(new Date(moment(this.lastWeekStats[i].date).toDate()), this.lastWeekStats[i].count));

    };


    this.weekdata = {
      datasets: [{
        label: 'This Week',
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
      scales: {

        xAxes: [{
          type: 'time',
          time: {
            round: "minute",
            displayFormats: {
              day: 'dddd, MMM D',
            },
            isoWeekday: true,

            // max: moment(this.lastWeekStats[this.lastWeekStats.length - 1].date).add(7, "days"),
            // min: moment(this.thisWeekStats[0].date),

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
            max: 300
          },
          scaleLabel:
          {
            display: true,
            labelString: "HeadCount",
          }
        }]

      },
      responsive: true,


    };

  }




  ngOnInit() {


    this.statService.getToday("WR")
      .subscribe(
      stats => {
        //TODO: Dont reverse whole array
        this.todayStats = stats;
        this.todayStatsR = stats.slice();
        this.todayStatsR.reverse();

        


      },null,()=>{

        if (this.todayStats != null && this.todayStats.length < 1) {
          console.log("Morning Of = Closed");
          this.todayStats.push(new Stat(null, "CM", -1, new Date(Date.now())));
        }
        this.getTTLW();

      });

    


    this.statService.getThisWeek("WR")
      .subscribe(
      stats => {
        this.thisWeekStats = stats;
        this.weekstartDate = stats[0].date;
      },null,()=> {
        this.getLastWeekNext();
      });

   

  }

//Called after getThisWeek
 getLastWeekNext(){
    this.statService.getLastWeek("WR")
      .subscribe(
      stats => {
        this.lastWeekStats = stats;
        console.log("Set Data");
      },null,()=> {

        this.lastWeekStats.forEach(element => {
          element.date = moment(element.date).add(7,"days").toDate();
        });
        this.buildWeek();
      });
      }

    getTTLW(){
      this.statService.getTTLW("WR")
      .subscribe(
      stats => {
        this.thisTimeLastWeek = stats;
      },null,()=> {
        this.buildDay();
      });
    }

}
