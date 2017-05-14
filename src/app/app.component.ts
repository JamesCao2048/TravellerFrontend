import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UserService} from './user/user.service';
import {User} from "./user/user";
import {CookieService} from "angular2-cookie/core";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './share/share.css'],
    providers: [UserService, CookieService]
})
export class AppComponent implements OnInit {
    employeeAddressForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    submitted: boolean = false;
    opening: boolean = false;
    curuser: User;
    addNewEmployeeAddress() {
        this.employeeAddressForm.reset();
        this.submitted = false;
    }
    constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {
    }
    onSubmit() {
        this.opening = false;
        console.log(this.employeeAddressForm.controls.username.value);
        console.log(this.employeeAddressForm.controls.password.value);
        /*this.userService.login(this.employeeAddressForm.controls.username.value,
            this.employeeAddressForm.controls.password.value).subscribe(user => {this.curuser = user; console.log(this.curuser);
            this.cookieService.putObject("user", user ); console.log(this.cookieService.getObject("user"));
            // window.location.reload();
            });*/
    }
    onClickLogin() {
        this.opening = true;
    }
    onClickLogout() {
        /*this.userService.logout().subscribe(result => { console.log(result); });
        this.cookieService.remove("user");*/
    }
    mockInit() {
        let user = new User({"u_name": "junmingcao", "u_password": "233", "u_mail": "fuckyou@dogliang.com", "u_role": 8,
            "u_gender": 1, "u_job": "fucker", "u_hash": "hashnumber", "u_age": 18, "id": "233"});
        this.cookieService.putObject("user", user);
    }
    ngOnInit() {
        this.mockInit();
    }
}
