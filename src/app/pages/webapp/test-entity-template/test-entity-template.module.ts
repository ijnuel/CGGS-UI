import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestEntityTemplateComponent } from './test-entity-template.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CreateUpdateTestEntityTemplateComponent } from './create-update-test-entity-template/create-update-test-entity-template.component';

const routes: Routes = [
  {
    path: '',
    component: TestEntityTemplateComponent,
  },

  {
    path: 'create',
    component: CreateUpdateTestEntityTemplateComponent,
  },

  {
    path: 'edit/:testEntityTemplateId',
    component: CreateUpdateTestEntityTemplateComponent,
  },
];

@NgModule({
  declarations: [TestEntityTemplateComponent, CreateUpdateTestEntityTemplateComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class TestEntityTemplateModule {}
