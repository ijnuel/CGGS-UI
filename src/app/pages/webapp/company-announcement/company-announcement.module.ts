import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyAnnouncementComponent } from './company-announcement.component';
import { CreateUpdateCompanyAnnouncementComponent } from './create-update-company-announcement/create-update-company-announcement.component';
import { ViewCompanyAnnouncementComponent } from './view-company-announcement/view-company-announcement.component';

const routes: Routes = [
  { path: '',         component: CompanyAnnouncementComponent },
  { path: 'create',   component: CreateUpdateCompanyAnnouncementComponent },
  { path: 'edit/:id', component: CreateUpdateCompanyAnnouncementComponent },
  { path: 'view/:id', component: ViewCompanyAnnouncementComponent },
];

@NgModule({
  declarations: [
    CompanyAnnouncementComponent,
    CreateUpdateCompanyAnnouncementComponent,
    ViewCompanyAnnouncementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class CompanyAnnouncementModule {}
