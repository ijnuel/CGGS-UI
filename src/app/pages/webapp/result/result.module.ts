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
import { PromoteStudentsComponent } from './promote-students/promote-students.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { UserRolesEnum } from '../../../types/auth';
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
        data: { roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff] },
    },
    {
        path: 'update',
        component: UpdateResultComponent,
        data: { roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin, UserRolesEnum.Staff] },
    },
    {
        path: 'my-result',
        component: StudentResultComponent,
        data: { roles: [UserRolesEnum.Student] },
    },
    {
        path: 'my-result/:termId',
        component: ReportCardComponent,
        data: { roles: [UserRolesEnum.Student] },
    },
    {
        path: 'promote',
        component: PromoteStudentsComponent,
        data: { roles: [UserRolesEnum.SuperAdmin, UserRolesEnum.Admin] },
    }
];

@NgModule({
    declarations: [ResultComponent, UpdateResultComponent, ViewResultComponent, StudentResultComponent, PromoteStudentsComponent, ReportCardComponent],
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