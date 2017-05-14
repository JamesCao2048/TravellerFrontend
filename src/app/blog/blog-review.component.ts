/**
 * Created by drjr on 17-4-17.
 */
/**
 * Created by drjr on 17-4-17.
 */
import {Component, OnInit} from "@angular/core";
import {CookieService} from "angular2-cookie/core";
import {Blog} from "./blog";
import {BlogService} from "./blog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Review} from "../share/review";
import {User} from "../user/user";

@Component({
    templateUrl: './blog-review.component.html',
    styleUrls: ['../share/share.css']
})
export class BlogReviewComponent implements OnInit {
    blogs: Blog[];
    curBlog: Blog;
    curReview: Review;
    imgCount: number;
    employeeAddressForm = new FormGroup({
        point: new FormControl('', Validators.required),
        confidence: new FormControl('', Validators.required),
        comment: new FormControl('', Validators.required)
    });
    constructor(private cookieService: CookieService, private blogService: BlogService) {
    }
    getBlogs() {
        this.blogService.getBlogs().subscribe(
            blogs =>  {this.blogs = this.blogService.filterBlog(blogs); this.curBlog = blogs[0];
            if (this.curBlog !== undefined && this.curBlog.ar_review_list !== undefined) {
               this.curReview = this.curBlog.ar_review_list[0];
            }
            console.log(this.blogs); }  );
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
        console.log(this.employeeAddressForm.controls.point.value);
        console.log(this.employeeAddressForm.controls.confidence.value);
        console.log(this.employeeAddressForm.controls.comment.value);
        let review = new Review();
        review.ar_point = this.employeeAddressForm.controls.point.value;
        review.ar_confidence = this.employeeAddressForm.controls.confidence.value;
        review.ar_comment = this.employeeAddressForm.controls.comment.value;
        this.curBlog.ar_review_list.push(review);
        console.log(this.curBlog);
        this.blogService.putBlog(this.curBlog).subscribe(re => console.log("re:", re));
        this.curReview = review;
        console.log("curreview:", "review");
        // window.location.reload();
    }
    onClickImg() {
        this.imgCount = (this.imgCount + 1) % this.curBlog.ar_url_list.length;
    }
    ifWrite(): boolean { return !(this.curBlog.ar_reviewer[this.curBlog.ar_review_list.length] !== undefined &&
         (this.cookieService.getObject('user') as User).u_name === this.curBlog.ar_reviewer[this.curBlog.ar_review_list.length].u_name);
    }
}
