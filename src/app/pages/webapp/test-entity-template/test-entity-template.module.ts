import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { TestEntityTemplateComponent } from './test-entity-template.component';
import { SharedModule } from '../../../shared/shared.module';
import { CreateUpdateTestEntityTemplateComponent } from './create-update-test-entity-template/create-update-test-entity-template.component';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule,
        MatRadioModule,
    ],
    providers: [provideNativeDateAdapter()],
})
export class TestEntityTemplateModule { }