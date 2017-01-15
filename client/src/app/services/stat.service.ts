import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Stat } from '../models/stat';
@Injectable()
export class StatService {

  constructor(private http: Http) { }

  getWeek(loc: string): Observable<Stat[]> {

    console.log("Called Get Today");

    return this.http.get("api/stats/thisweek").map((res) => res.json()).catch(this.handleError);

  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure

    // console.log("Error with tab retrieval");

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

