import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CreateUpdateAdministratorComponent } from './create-update-administrator/create-update-administrator.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
  },

  {
    path: 'create',
    component: CreateUpdateAdministratorComponent,
  },

  {
    path: 'edit/:administratorId',
    component: CreateUpdateAdministratorComponent,
  },
];

@NgModule({
  declarations: [AdministratorComponent, CreateUpdateAdministratorComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class AdministratorModule {}
