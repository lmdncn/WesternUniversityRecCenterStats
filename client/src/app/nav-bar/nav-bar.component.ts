import { Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';
import { StatService } from '../services/stat.service';
import { HoursService } from "../services/hours.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


    lastData: Date;
    WRCurrentCount: number;
    CMCurrentCount: number;
    BBALLCurrentCount: number;
    VBALLCurrentCount: number;
    BDMTCurrentCount: number;
    FUTSCurrentCount: number;
    
    constructor(private statService: StatService, private hoursService: HoursService) { }

    ngOnInit() {
            this.statService.getCurrentCount("WR")
                .subscribe(
                stat => {
                    if (stat == null) { this.WRCurrentCount = -1; }
                    else {
                        this.WRCurrentCount = stat.count;
                    }
                });
            this.statService.getCurrentCount("CM")
                .subscribe(
                stat => {
                    if (stat == null) { this.CMCurrentCount = -1; }
                    else {
                        this.CMCurrentCount = stat.count;
                    }
                });
            this.statService.getCurrentCount("BBALL")
                .subscribe(
                stat => {
                    if (stat == null) { this.BBALLCurrentCount = -1; }
                    else {
                        this.BBALLCurrentCount = stat.count;
                        this.lastData = stat.date;
                    }
                });
            this.statService.getCurrentCount("VBALL")
                .subscribe(
                stat => {
                    if (stat == null) { this.VBALLCurrentCount = -1; }
                    else {
                        this.VBALLCurrentCount = stat.count;
                    }
                });
            this.statService.getCurrentCount("BDMT")
                .subscribe(
                stat => {
                    if (stat == null) { this.BDMTCurrentCount = -1; }
                    else {
                        this.BDMTCurrentCount = stat.count;
                    }
                });
            this.statService.getCurrentCount("FUTS")
                .subscribe(
                stat => {
                    if (stat == null) { this.FUTSCurrentCount = -1; }
                    else {
                        this.FUTSCurrentCount = stat.count;
                    }
                });
        
    }

    reasonableTime() {
        if (moment(this.lastData).add(2, "hours") < moment()) {
            return false;
        } else {
            return true;
        }
    }





}
