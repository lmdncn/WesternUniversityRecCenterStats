import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

//Tools Import
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Component Import
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WrStatsComponent } from './wr-stats/wr-stats.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


//Service Import
import { StatService} from './services/stat.service';





//Set Routes
const appRoutes: Routes = [
   { path: '', redirectTo: 'WR', pathMatch: 'full' },
   { path: 'WR', component: WrStatsComponent }
];


@NgModule({
	
    declarations: [
	//Components go here
        AppComponent,
	NavBarComponent,
	WrStatsComponent,
	FooterComponent,
	HeaderComponent,
    ],
	
    imports: [
	//Modules go here
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
	
    providers: 
	//Services go here
	[
        StatService
    ],
	
    bootstrap: [AppComponent],
})


export class AppModule { }

