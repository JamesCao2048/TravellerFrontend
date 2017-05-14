/**
 * Created by john on 2017/4/17 0017.
 */
import {Component, OnInit} from '@angular/core';
import {CookieService} from "angular2-cookie/core";
import {Blog} from "./blog";
import {BlogService} from "./blog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Review} from "../share/review";
import {User} from "../user/user";

@Component({
    templateUrl: './blog-edit.component.html',
    styleUrls: ['../share/share.css']
})
export class BlogEditComponent implements OnInit {
        blogs: Blog[];
        curBlog: Blog;
        curReview: Review;
        imgCount: number;
        employeeAddressForm = new FormGroup({
            result: new FormControl('', Validators.required),
            comment: new FormControl('', Validators.required)
        });
        constructor(private cookieService: CookieService, private blogService: BlogService) {
        }
        getBlogs() {
            this.blogService.getBlogs().subscribe(
                blogs =>  {this.blogs = this.blogService.filterBlog(blogs); this.curBlog = blogs[0]; console.log(this.blogs);
                    if (this.curBlog !== undefined && this.curBlog.ar_review_list !== undefined) {
                        this.curReview = this.curBlog.ar_review_list[0];
                    }} );
        }
        ngOnInit() {
            this.getBlogs();
            this.imgCount = 0;
        }
    onClickNav(blog: Blog) {
        this.curBlog = blog;
        this.curReview = this.curBlog.ar_review_list[0];
    }
    onClickReview(i: number) {
        this.curReview = this.curBlog.ar_review_list[i];
    }
    onSubmit() {
        console.log(this.employeeAddressForm.controls.result.value);
        console.log(this.employeeAddressForm.controls.comment.value);
         let review = new Review();
        review.ar_result = this.employeeAddressForm.controls.result.value === 'Pass' ? 1 : 0;
        review.ar_comment = this.employeeAddressForm.controls.comment.value;
        console.log(review);
        this.curBlog.ar_review_list.push(review);
        this.blogService.putBlog(this.curBlog).subscribe(re => console.log(re));
        // window.location.reload();
    }
    onClickImg() {
        this.imgCount = (this.imgCount + 1) % this.curBlog.ar_url_list.length;
    }

    ifWrite(): boolean {
            return !(this.curBlog.ar_editor !== undefined &&
             (this.cookieService.getObject('user') as User).u_name === this.curBlog.ar_editor.u_name &&
            this.curBlog.ar_review_list.length === 3);
    }
}
