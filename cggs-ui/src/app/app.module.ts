import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './modules/account/account.component';
import { ApiModule, BASE_PATH } from './services/api-service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LocalService } from './services/local-service/local.service';
import { LoginComponent } from './modules/account/login/login.component';
import { AuthenticatedLayoutComponent } from './components/layouts/authenticated-layout/authenticated-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { LoadingIndicatorComponent } from './components/_partials/loading-indicator/loading-indicator.component';
import { TopNavBarComponent } from './components/_partials/top-nav-bar/top-nav-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountDropdownComponent } from './components/_partials/account-dropdown/account-dropdown.component';
import { CookieService } from 'ngx-cookie-service';
import { SideNavBarComponent } from './components/_partials/side-nav-bar/side-nav-bar.component';
import { PortalModule } from './modules/portal/portal.module';
import { PortalComponent } from './modules/portal/portal.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AuthenticatedLayoutComponent,
    AppComponent,
    AccountComponent,
    LoginComponent,
    AuthLayoutComponent,
    LoadingIndicatorComponent,
    TopNavBarComponent,
    DashboardComponent,
    AccountDropdownComponent,
    SideNavBarComponent,
  ],
  imports: [
    BrowserModule,
    ApiModule,
    // NgbModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.apiUrl },
    LocalService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
