import { Component, OnInit, Input } from '@angular/core';

import { HoursService } from "../services/hours.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor(private hoursService: HoursService) { 
  }

  ngOnInit() {
  }

}
