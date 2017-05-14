/**
 * Created by john on 2017/4/18 0018.
 */
/**
 * Created by john on 2017/4/18 0018.
 */
import {User} from "../user/user";
import {Time} from "../share/Time";
import {Url} from "../share/Url";
import {Tag} from "../share/Tag";
import {Review} from "../share/review";
import {Blog} from "./blog";
/**
 * Created by john on 2017/4/10 0010.
 */
export class PutBlog {
    ar_title: string;
    ar_content?: string;
    at_place: string;
    ar_category: string;
    ar_author: User;
    ar_reviewer: User[];
    ar_editor: User;
    ar_time_list: Time[];
    ar_url_list: Url[];
    ar_tag_list: Tag[];
    ar_review_list: Review[];
    constructor (json: any) {
        this.ar_title = json.ar_title;
        this.ar_content = json.ar_content;
        this.at_place = json.at_place;
        this.ar_category =  json.ar_category;
        this.ar_author = json.ar_author;
        this.ar_reviewer = json.ar_reviewer;
        this.ar_editor = json.ar_editor;
        this.ar_time_list = json.ar_time_list;
        this.ar_url_list = json.ar_url_list;
        this.ar_tag_list = json.ar_tag_list;
        this.ar_review_list = json.ar_review_list;
    }
}
