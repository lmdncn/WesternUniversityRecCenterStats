import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Stat } from '../models/stat';


@Injectable()
export class StatService {

  constructor(private http: Http) { }

  getThisWeek(loc: string): Observable<Stat[]> {

    return this.http.get("api/stats/thisweek?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getLastWeek(loc: string): Observable<Stat[]> {

    return this.http.get("api/stats/lastweek?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getToday(loc: string): Observable<Stat[]> {

    return this.http.get("api/stats/today?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getTTLW(loc: string): Observable<Stat[]> {

    return this.http.get("api/stats/ttlw?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getCurrentCount(loc: string){
 
  return this.http.get("api/stats/count?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getProjected(loc: string){
 
  return this.http.get("api/stats/projected?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  getProjectedTomorrow(loc: string){
 
  return this.http.get("api/stats/projectedTomorrow?loc=" + loc).map((res) => res.json()).catch(this.handleError);

  }

  projectedTomorrow


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

