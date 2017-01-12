import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

//Tools Import
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Component Import
import { AppComponent } from './app.component';


//Service Import





//Set Routes
// const appRoutes: Routes = [
//    { path: '', redirectTo: 'Home', pathMatch: 'full' },
//    { path: 'Home', component: HomepageComponent },
// ];


@NgModule({
	
    declarations: [
	//Components go here
        AppComponent,
    ],
	
    imports: [
	//Modules go here
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        //RouterModule.forRoot(appRoutes)
    ],
	
    providers: 
	//Services go here
	[],
	
    bootstrap: [AppComponent],
})


export class AppModule { }

