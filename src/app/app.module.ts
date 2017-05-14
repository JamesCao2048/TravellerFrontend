import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AuthorityComponent } from "./authority/authority.component";
import {BlogEditComponent} from "./blog/blog-edit.component";
import {BlogOverviewComponent} from "./blog/blog-overview.component";
import { UserComponent } from './user/user.component';
import {CookieService} from "angular2-cookie/core";
import {BlogReviewComponent} from "./blog/blog-review.component";
import {BlogService} from "./blog/blog.service";
import {UserService} from "./user/user.service";
import {MarketDepthComponent} from "./depth/marketdepth.component";
import {OrderComponent} from "./order/order.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {ChartComponent} from "./transaction/chart.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthorityComponent,
        HomeComponent,
        BlogEditComponent,
        BlogOverviewComponent,
        BlogReviewComponent,
        UserComponent,
        MarketDepthComponent,
        OrderComponent,
        TransactionComponent,
        ChartComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING,
        ReactiveFormsModule,
        ChartsModule
    ],
    providers: [CookieService, BlogService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
