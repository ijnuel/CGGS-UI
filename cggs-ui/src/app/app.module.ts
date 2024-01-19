import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './modules/account/account.component';
import { ApiModule, BASE_PATH } from './services/api-service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LocalService } from './services/local-service/local.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './modules/account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.apiUrl },
    LocalService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
