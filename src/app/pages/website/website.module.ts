import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WebsiteComponent } from './website.component';
import { WebsiteService } from './website.service';

const routes: Routes = [
  { path: '', component: WebsiteComponent },
  { path: ':companyId', component: WebsiteComponent },
];

@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [WebsiteService],
  exports: [WebsiteComponent],
})
export class WebsiteModule {}
