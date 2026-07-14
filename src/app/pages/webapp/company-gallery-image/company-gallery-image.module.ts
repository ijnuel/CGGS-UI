import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { CompanyGalleryImageComponent } from './company-gallery-image.component';
import { CreateUpdateCompanyGalleryImageComponent } from './create-update-company-gallery-image/create-update-company-gallery-image.component';
import { ViewCompanyGalleryImageComponent } from './view-company-gallery-image/view-company-gallery-image.component';

const routes: Routes = [
  { path: '',         component: CompanyGalleryImageComponent },
  { path: 'create',   component: CreateUpdateCompanyGalleryImageComponent },
  { path: 'edit/:id', component: CreateUpdateCompanyGalleryImageComponent },
  { path: 'view/:id', component: ViewCompanyGalleryImageComponent },
];

@NgModule({
  declarations: [
    CompanyGalleryImageComponent,
    CreateUpdateCompanyGalleryImageComponent,
    ViewCompanyGalleryImageComponent,
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
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class CompanyGalleryImageModule {}
