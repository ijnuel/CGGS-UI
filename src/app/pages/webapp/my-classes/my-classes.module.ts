import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyClassesComponent } from './my-classes.component';

const routes: Routes = [
  {
    path: '',
    component: MyClassesComponent,
  },
];

@NgModule({
  declarations: [MyClassesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class MyClassesModule {}
