import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    employeeAddressForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    submitted = false;
    opening = false;
    addNewEmployeeAddress() {
        this.employeeAddressForm.reset();
        this.submitted = false;
    }
    constructor(private router: Router) {
    }
    onSubmit() {
        this.opening = false;
        console.log(this.employeeAddressForm.controls.username.value);
        console.log(this.employeeAddressForm.controls.password.value);
    }
    onClickLogin() {
        this.opening = true;
    }
}
