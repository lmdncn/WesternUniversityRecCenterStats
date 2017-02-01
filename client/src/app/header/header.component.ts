import {
  Component, OnInit, Input, Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Hours } from "../models/hours";
import * as moment from 'moment';

import { HoursService } from '../services/hours.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-10%)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(-10%)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {

  @Input() mobile;
  help = false;
  DOW = moment().format("dddd");
  constructor(private hoursService: HoursService) { }

  ngOnInit() {
  }

  helpme() {
    this.help = !this.help;
  }

}
