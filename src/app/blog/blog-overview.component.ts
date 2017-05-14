/**
 * Created by drjr on 17-4-17.
 */
import {Component, OnInit} from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {BlogService} from "./blog.service";
import {Blog} from "./blog";
import {UserService} from "../user/user.service";
import {User} from "../user/user";
import {window} from "rxjs/operator/window";
import {PutBlog} from "./putblog";

@Component({
    templateUrl: './blog-overview.component.html',
    styleUrls: ['../share/share.css']
})
export class BlogOverviewComponent implements OnInit {
    blogs: Blog[];
    editors: User[];
    reviewers: User[];
    selectMap: object;
    users: User[];
    constructor(private cookieService: CookieService, private blogService: BlogService, private userService: UserService) {
    }
    getBlogs() {
        this.blogService.getBlogs().subscribe(
            blogs =>  {this.blogs = this.blogService.filterBlog(blogs); this.setMap(this.blogs); console.log(this.blogs); }  );
    }
    getEditors(users: User[]) {
        for (let user of users )
        {
            if (user.u_role >= 4) {
                this.editors.push(user);
            }
        }
    }
    getReviewers(users: User[]) {
        for (let user of users )
        {
            if (user.u_role >= 2) {
                this.reviewers.push(user);
            }
        }
    }
    setMap(blogs: Blog[]) {
        for (let blog of blogs)
        {
            this.selectMap[blog.id + '_editor'] = blog.ar_editor === undefined ? 'default' : blog.ar_editor.u_name;
            this.selectMap[blog.id + '_reviewer1'] = blog.ar_reviewer[0] === undefined ? 'default' : blog.ar_reviewer[0].u_name;
            this.selectMap[blog.id + '_reviewer2'] = blog.ar_reviewer[1] === undefined ? 'default' : blog.ar_reviewer[1].u_name;
            this.selectMap[blog.id + '_reviewer3'] = blog.ar_reviewer[2] === undefined ? 'default' : blog.ar_reviewer[2].u_name;
        }
    }
    ngOnInit() {
        this.editors = new Array<User>();
        this.reviewers = new Array<User>();
        this.selectMap = new Object;
        this.getBlogs();
        this.userService.getUsers().subscribe(
             us => {this.users = us; console.log(this.users);
             this.getEditors(this.users);
             this.getReviewers(this.users);
             }
        );
    }

    onClickReset() {
    }

    onClickSubmit() {
        for (let blog of this.blogs){
            if (this.findUserByName(this.selectMap[blog.id + '_editor'], this.users) !== undefined) {
            blog.ar_editor = this.findUserByName(this.selectMap[blog.id + '_editor'], this.users);
            }
            blog.ar_reviewer[0] = this.findUserByName(this.selectMap[blog.id + '_reviewer1'], this.users);
            blog.ar_reviewer[1] = this.findUserByName(this.selectMap[blog.id + '_reviewer2'], this.users);
            blog.ar_reviewer[2] = this.findUserByName(this.selectMap[blog.id + '_reviewer3'], this.users);
            while (blog.ar_reviewer[blog.ar_reviewer.length - 1] === undefined && blog.ar_reviewer.length > 0 ) {
                blog.ar_reviewer.pop();
                console.log(blog.ar_reviewer);
            }
            this.blogService.putBlog(blog).subscribe( json =>  {  console.log(json); } );
        }
        // console.log(this.blogs);
        this.getBlogs();
    }
    findUserByName(name: string, users: User[]): User {
        for (let user of users){
            if (user.u_name === name) {
                console.log("found:" + user);
                return user;
            }
        }
        return undefined;
    }
    onClickDelete(id: string) {
        this.blogService.deleteBlog(id);
    }
    onLog() {
        console.log(this.selectMap);
    }
}
