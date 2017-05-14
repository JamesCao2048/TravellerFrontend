import {Component} from "@angular/core";
import {UserService} from "./user.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'my-useres',
  templateUrl: './user.component.html',
    styleUrls: ['../share/share.css'],
  providers: [UserService, CookieService]
})
export class UserComponent  {
  errorMessage: string;
  constructor(private userService: UserService, private cookieService: CookieService) {
  }
}

