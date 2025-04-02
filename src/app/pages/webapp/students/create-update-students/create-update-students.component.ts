import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsFacade } from '../../../../store/students/students.facade';

@Component({
  selector: 'app-create-update-students',
  templateUrl: './create-update-students.component.html',
  styleUrl: './create-update-students.component.scss',
})
export class CreateUpdateStudentsComponent {
  loading$: Observable<boolean>;

  constructor(private studentsFacade: StudentsFacade) {
    this.loading$ = this.studentsFacade.selectedLoading$;
  }
}
