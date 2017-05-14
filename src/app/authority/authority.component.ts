/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component, OnInit} from "@angular/core";
import {User} from "../user/user";
import {CookieService} from "angular2-cookie/core";
import {BlogService} from "../blog/blog.service";
import {UserService} from "../user/user.service";

@Component({
    styleUrls: ['./authority.component.scss', '../share/share.css'],
    templateUrl: './authority.component.html'
})
export class AuthorityComponent implements OnInit {
    selectMap: object;
    users: User[];
    options: string[];
    constructor(private cookieService: CookieService, private blogService: BlogService, private userService: UserService) {
    }
    setMap(users: User[]) {
        for (let user of users)
        {
            this.selectMap[user.id] = user.u_role === undefined ? 0 : user.u_role;
        }
    }
    ngOnInit() {
        this.selectMap = new Object;
        this.userService.getUsers().subscribe(
            us => {this.users = us; this.setMap(this.users);
            console.log(this.users);
            }
        );
        this.options = ["anonymous", "user", "reviewer", "editor", "admin"];
    }
    getOptions(target: string): string[] {
        if ((this.cookieService.getObject('user') as User).u_role > 8)
        {
            return this.filterOption(this.options.slice(0, 5), target);
        }
        if ((this.cookieService.getObject('user') as User).u_role > 4)
        {
            return this.filterOption(this.options.slice(0, 4), target);
        }
        if ((this.cookieService.getObject('user') as User).u_role > 2)
        {
            return this.filterOption(this.options.slice(0, 3), target);
        }
    }
    filterOption(options: string[], target: string): string[] {
        let newoptions = new Array<string>();
        for (let o of options){
            if (o !== target) {
                newoptions.push(o);
            }
        }
        return newoptions;
    }

    getRoleName(role: number): string {
        if (role < 1) {
            return 'anonymous';
        }
        if (role < 2) {
            return 'user';
        }
        if (role < 4) {
            return 'reviewer';
        }
        if (role < 8) {
            return 'editor';
        }
        if (role < 16) {
            return 'admin'; }
        return undefined;
    }

    getRoleNumber(role: string): number{
        if (role === 'admin'){
            return 8;
        }
        if (role === 'editor'){
            return 4;
        }
        if (role === 'reviewer'){
            return 2;
        }
        if (role === 'user'){
            return 1;
        }
        return 0;
    }

    onClickSubmit(user: User) {
        user.u_role = this.getRoleNumber(this.selectMap[user.id]);
        this.userService.putUser(user).subscribe(re => {console.log(re); window.location.reload(); });
        console.log(user);
    }
    onSubmit() {
        /* for (let user of this.users){
            user.u_role = this.getRoleNumber(this.selectMap[user.id]);
            this.userService.putUser(user).subscribe(re => {console.log(re); window.location.reload(); });
        }*/
        return;
    }
    onClickReset() { }
    findUserByName(name: string, users: User[]): User {
            for (let user of users) {
                if (user.u_name === name) {
                    console.log("found:" + user);
                    return user;
                }
            }
        }
        onLog() {
             console.log(this.selectMap);
            console.log( this.filterOption(this.options.slice(0, 4), "anonymous"));
            console.log(this.filterOption(this.options.slice(0, 4), "user"));
            console.log(this.filterOption(this.options.slice(0, 4), "reviewer"));
            console.log(this.filterOption(this.options.slice(0, 4), "editor"));
            console.log(this.filterOption(this.options.slice(0, 4), "admin"));
            for (let user of this.users){
                console.log(this.filterOption(
                    this.getOptions
                    (this.getRoleName((this.cookieService.getObject('user') as User).u_role)), this.getRoleName(user.u_role)));
            }
            console.log(this.getRoleName((this.cookieService.getObject('user') as User).u_role));
            console.log(this.getOptions
            (this.getRoleName((this.cookieService.getObject('user') as User).u_role)));
    }
}
