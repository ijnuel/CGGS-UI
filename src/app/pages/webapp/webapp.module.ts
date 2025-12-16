import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebappRoutingModule } from './webapp-routing.module';
import { WebappComponent } from './webapp.component';
import { SharedModule } from "../../shared/shared.module";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS
} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [WebappComponent],
  imports: [CommonModule, WebappRoutingModule, SharedModule, MatMomentDateModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ],
})
export class WebappModule {}
