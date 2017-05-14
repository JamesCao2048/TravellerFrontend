/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {RouterModule, Routes} from "@angular/router";

import {AuthorityComponent} from "./authority/authority.component";
import {HomeComponent} from "./home/home.component";
import {BlogEditComponent} from "./blog/blog-edit.component";
import {BlogOverviewComponent} from "./blog/blog-overview.component";
import {UserComponent} from "./user/user.component";
import {BlogReviewComponent} from "./blog/blog-review.component";
import {MarketDepthComponent} from "./depth/marketdepth.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {OrderComponent} from "./order/order.component";


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'authority', component: AuthorityComponent },
    {path: 'profile', component: UserComponent },
    {path: 'blog/overview', component: BlogOverviewComponent },
    {path: 'blog/edit', component: BlogEditComponent },
    {path: 'blog/review', component: BlogReviewComponent },
    {path: 'blog', component: BlogOverviewComponent},
    {path: 'depth', component: MarketDepthComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'order', component: OrderComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
