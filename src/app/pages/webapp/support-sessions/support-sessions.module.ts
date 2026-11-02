import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupportSessionsComponent } from './support-sessions.component';

const routes: Routes = [
  {
    path: '',
    component: SupportSessionsComponent,
  },
];

@NgModule({
  declarations: [SupportSessionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatProgressSpinnerModule],
})
export class SupportSessionsModule {}
