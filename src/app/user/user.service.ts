// Observable Version
import { Injectable }              from '@angular/core';
import {Http, Response, ResponseOptions}          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';
import { Parameter } from '../share/parameter';
import {PutUser} from "./putuser";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class UserService {
  private userUrl = Parameter.myUrl;

  constructor (private http: Http, private cookieService: CookieService) {}

  getUsers (): Observable<User[]> {
      let options = new RequestOptions({
          headers: this.getHeaders()
      });
    return this.http.get(this.userUrl + 'User', options)
      .map(e => e.json().User)
      .catch(this.handleError);
  }

  login (name: string, passwd: string): Observable<User> {
      if ( this.userUrl === Parameter.rmpUrl) {
    return this.http.get(Parameter.rmpUrl + 'User/?' + 'User.u_name=' + name )
      .map(e => e.json().User[0])
      .catch(this.handleError);
      } else {
    // console.log(this.http.get(this.userUrl + 'User/Login?' + 'u_name=' + name + '&u_password=' + passwd));
     return this.http.get(this.userUrl + 'User/Login?' + 'u_name=' + name + '&u_password=' + passwd )
       .map(e => { return e.json().hasOwnProperty('message') ? undefined : e.json(); })
        .catch(this.handleError);
      }
  }
  logout (): Observable<Object> {
      // this.getHeaders();
      let options = new RequestOptions({
          headers: this.getHeaders()
      });
      return this.http.post(this.userUrl + 'User/Logout', null, options)
          .map(e => { return e.json().hasOwnProperty('message') ? undefined : e.json(); })
          .catch(this.handleError);
  }
  putUser (user: User): Observable<User> {
      let options = new RequestOptions({
          headers: this.getHeaders()
      });
        return this.http.put(this.userUrl + 'User', user, options )
            .catch(this.handleError);
    }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
  getHeaders(): Headers {
      let headers = new Headers({"User-Hash": (this.cookieService.getObject('user') as User).u_hash.toString(),
          "Username": (this.cookieService.getObject('user') as User).u_name.toString()
      });
      console.log(headers);
      return headers;
  }

}



/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
