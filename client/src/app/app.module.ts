import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

//SemanticUI
import { SuiModule } from 'ng2-semantic-ui/ng2-semantic-ui';

//ChartJS
import { ChartModule } from 'angular2-chartjs';

//Tools Import
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

//Component Import
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WrStatsComponent } from './wr-stats/wr-stats.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CmStatsComponent } from './cm-stats/cm-stats.component';
import { BbStatsComponent } from './bb-stats/bb-stats.component'

//Service Import
import { StatService } from './services/stat.service';


//Pipe Import
import { DateFormatPipe } from './pipes/date-format.pipe';
import { VbStatsComponent } from './vb-stats/vb-stats.component';
import { BmStatsComponent } from './bm-stats/bm-stats.component';
import { FsStatsComponent } from './fs-stats/fs-stats.component';

//Set Routes
const appRoutes: Routes = [
    { path: '', redirectTo: 'WeightRoom', pathMatch: 'full' },
    { path: 'WeightRoom', component: WrStatsComponent },
    { path: 'CardioMachines', component: CmStatsComponent },
    { path: 'Basketball', component: BbStatsComponent },
    { path: 'Volleyball', component: VbStatsComponent },
    { path: 'Badminton', component: BmStatsComponent },
    { path: 'Futsal', component: FsStatsComponent },

];


@NgModule({

    declarations: [
        //Components go here
        AppComponent,
        NavBarComponent,
        WrStatsComponent,
        FooterComponent,
        HeaderComponent,
        DateFormatPipe,
        CmStatsComponent,
        BbStatsComponent,
        VbStatsComponent,
        BmStatsComponent,
        FsStatsComponent,
    ],

    imports: [
        //Modules go here
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        SuiModule,
        ChartModule,
        Ng2PageScrollModule.forRoot()
    ],

    providers:
    //Services go here
    [
        StatService
    ],

    bootstrap: [AppComponent],
})


export class AppModule { }

