import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { SchoolSettingsComponent } from './school-settings.component';

const routes: Routes = [{ path: '', component: SchoolSettingsComponent }];

@NgModule({
  declarations: [SchoolSettingsComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class SchoolSettingsModule {}
