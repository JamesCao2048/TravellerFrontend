/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {RouterModule, Routes} from "@angular/router";

import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {BlogEditComponent} from "./blog/blog-edit.component";
import {BlogOverviewComponent} from "./blog/blog-overview.component";


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'blog/overview', component: BlogOverviewComponent},
    {path: 'blog/edit', component: BlogEditComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
