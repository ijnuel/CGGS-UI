import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebappRoutingModule } from './webapp-routing.module';
import { WebappComponent } from './webapp.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [WebappComponent],
  imports: [CommonModule, WebappRoutingModule, SharedModule],
})
export class WebappModule {}
