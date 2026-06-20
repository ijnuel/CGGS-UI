import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import * as StudentClassActions from './student-class.actions';
import * as StudentClassSelector from './student-class.selector';
import { PageQueryInterface, StudentClassFormInterface, StudentClassListInterface, StudentListInterface } from '../../types';
import { StudentFacade } from '../student/student.facade';

@Injectable()
export class StudentClassFacade {
  studentClassList$;
  studentClassById$;
  loading$ = this.store.pipe(select(StudentClassSelector.selectLoading));
  error$ = this.store.pipe(select(StudentClassSelector.selectError));
  createSuccess$ = this.store.pipe(select(StudentClassSelector.selectCreateSuccess));
  updateSuccess$ = this.store.pipe(select(StudentClassSelector.selectUpdateSuccess));
  deleteSuccess$ = this.store.pipe(select(StudentClassSelector.selectDeleteSuccess));

  constructor(
    private readonly store: Store,
    private readonly studentFacade: StudentFacade,
  ) {
    const studentMap$ = this.studentFacade.studentAll$.pipe(
      map(students => new Map<string, StudentListInterface>(
        (students ?? []).map(s => [s.id, s])
      ))
    );

    const hydrate = (
      sc: StudentClassListInterface,
      studentMap: Map<string, StudentListInterface>,
    ): StudentClassListInterface => ({
      ...sc,
      student: sc.student ?? studentMap.get(sc.studentId),
    });

    this.studentClassList$ = combineLatest([
      this.store.pipe(select(StudentClassSelector.selectStudentClassList)),
      studentMap$,
    ]).pipe(
      map(([list, studentMap]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(sc => hydrate(sc, studentMap)) };
      })
    );

    this.studentClassById$ = combineLatest([
      this.store.pipe(select(StudentClassSelector.selectStudentClassById)),
      studentMap$,
    ]).pipe(
      map(([sc, studentMap]) => sc ? hydrate(sc, studentMap) : sc)
    );

    this.studentFacade.getStudentAll();
  }

  getStudentClassList(pageQuery: PageQueryInterface) {
    this.store.dispatch(StudentClassActions.getStudentClassList({ pageQuery }));
  }

  getStudentClassById(studentClassId: string) {
    this.store.dispatch(StudentClassActions.getStudentClassById({ studentClassId }));
  }

  createStudentClass(payload: StudentClassFormInterface) {
    this.store.dispatch(StudentClassActions.createStudentClass({ payload }));
  }

  updateStudentClass(payload: StudentClassFormInterface) {
    this.store.dispatch(StudentClassActions.editStudentClass({ payload }));
  }

  deleteStudentClass(id: string) {
    this.store.dispatch(StudentClassActions.deleteStudentClass({ id }));
  }
}
