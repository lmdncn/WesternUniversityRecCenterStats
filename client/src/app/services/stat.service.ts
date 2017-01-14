import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Stat } from '../models/stat';
@Injectable()
export class StatService {

  constructor(private http: Http) { }

  getToday(loc: string): Observable<Stat[]> {

    console.log("Called Get Today");




let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // console.log("Posting to db" + JSON.stringify(t));

    return this.http.post("http://localhost:8080/api/stats/today ", JSON.stringify(new Stat(null,loc,null,null)), options).map((res) => res.json()).catch(this.handleError);

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

