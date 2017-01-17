//Formats date typr to something pretty using moment.js

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
   name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
   transform(date: any, format: string): any {
     let d = new Date(date)
     
     if(format == "fromNov"){
       return moment(d).fromNow();;
     }
     if(format != null){
      return moment(d).format(format); 
     }

     return moment(d).format('ddd, MMM D,  h:mm a');

}