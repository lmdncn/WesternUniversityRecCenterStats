import { Component, OnInit } from '@angular/core';
import {StatService} from '../services/stat.service';
import {Stat} from '../models/stat';

@Component({
  selector: 'app-cm-stats',
  templateUrl: './cm-stats.component.html',
  styleUrls: ['./cm-stats.component.css']
})
export class CmStatsComponent implements OnInit {

   thisWeekStats: Stat[];

  constructor(private statService: StatService) { }

  ngOnInit() {

this.statService.getThisWeek("CM")
      .subscribe(
      stats => { this.thisWeekStats = stats; });

  }

}
