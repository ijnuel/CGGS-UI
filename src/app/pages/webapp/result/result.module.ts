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
import { ResultComponent } from './result.component';
import { UpdateResultComponent } from './update-result/update-result.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { SharedModule } from '../../../shared/shared.module';
import { provideNativeDateAdapter } from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: ResultComponent,
    },
    {
        path: 'view',
        component: ViewResultComponent,
    },
    {
        path: 'update',
        component: UpdateResultComponent,
    },
    {
        path: 'my-result',
        component: StudentResultComponent,
    }
];

@NgModule({
    declarations: [ResultComponent, UpdateResultComponent, ViewResultComponent, StudentResultComponent],
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
export class ResultModule { }