import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule } from 'src/app/services/api-service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticatedLayoutComponent } from 'src/app/components/layouts/authenticated-layout/authenticated-layout.component';
import { AuthLayoutComponent } from 'src/app/components/layouts/auth-layout/auth-layout.component';
import { LoadingIndicatorComponent } from 'src/app/components/_partials/loading-indicator/loading-indicator.component';
import { TopNavBarComponent } from 'src/app/components/_partials/top-nav-bar/top-nav-bar.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AccountDropdownComponent } from 'src/app/components/_partials/account-dropdown/account-dropdown.component';
import { SideNavBarComponent } from 'src/app/components/_partials/side-nav-bar/side-nav-bar.component';
import { PortalComponent } from './portal.component';


@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
  ]
})
export class PortalModule { }
