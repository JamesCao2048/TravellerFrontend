/**
 * Created by john on 2017/4/18 0018.
 */
// Observable Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Blog} from './blog';
import { Parameter } from '../share/parameter';
import {CookieService} from "angular2-cookie/core";
import {PutBlog} from "./putblog";
import {UserService} from "../user/user.service";

@Injectable()
export class BlogService {
    private blogUrl = Parameter.myUrl;

    constructor (private http: Http, private cookieService: CookieService, private userService: UserService) {}

    getBlogs (): Observable<Blog[]> {
        let options = new RequestOptions({
            headers: this.userService.getHeaders()});
        return this.http.get(this.blogUrl + 'Article', options)
            .map(e => e.json().Article)
            .catch(this.handleError);
    }
    putBlog(blog: Blog): Observable<Blog> {
        let options = new RequestOptions({
            headers: this.userService.getHeaders()});
        console.log("put:", blog);
        return this.http.put(this.blogUrl + 'Article', blog , options)
            .map(e => e.json())
            .catch(this.handleError);
    }
    putBlogs(blogs: Blog[]) {
        for (let blog of blogs ){
            let options = new RequestOptions({
                headers: this.userService.getHeaders()});
            // console.log( Parameter.rmpUrl + 'Blog/' + blog.id);
            this.http.put(this.blogUrl + 'Article', blog, options)
            .map(e => e.json())
            .catch(this.handleError).subscribe(e => {console.log(e); });
        }
    }
    deleteBlog(id: string ) {
        this.http.delete(this.blogUrl + 'Article/' + id )
            .catch(this.handleError).subscribe(e => {console.log(e); });
    }
    filterBlog (blogs: Blog[]): Blog[] {
        return blogs.filter(blog => blog.ar_title !== undefined);
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
}



/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
