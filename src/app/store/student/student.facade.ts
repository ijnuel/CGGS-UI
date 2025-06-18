import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  StudentListInterface,
  StudentFormInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
} from '../../types';
import * as StudentAction from './student.actions';
import {
  selectStudentList,
  selectStudentAll,
  selectStudentByProperties,
  selectStudentById,
  selectExists,
  selectCount,
  selectStudentLoading,
  selectStudentError,
} from './student.selector';
import { StudentState } from './student.reducer';

@Injectable({
  providedIn: 'root',
})
export class StudentFacade {
  studentList$: Observable<PaginatedResponseInterface<StudentListInterface[]> | null>;
  studentAll$: Observable<StudentListInterface[] | null>;
  studentByProperties$: Observable<StudentListInterface[] | null>;
  studentById$: Observable<StudentListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(private store: Store<{ student: StudentState }>) {
    this.studentList$ = this.store.select(selectStudentList);
    this.studentAll$ = this.store.select(selectStudentAll);
    this.studentByProperties$ = this.store.select(selectStudentByProperties);
    this.studentById$ = this.store.select(selectStudentById);
    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectStudentLoading);
    this.error$ = this.store.select(selectStudentError);
  }

  getStudentList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(StudentAction.getStudentList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getStudentAll(): void {
    this.store.dispatch(StudentAction.getStudentAll());
  }

  getStudentById(studentId: string): void {
    this.store.dispatch(StudentAction.getStudentById({ studentId }));
  }

  getStudentByProperties(properties: Partial<StudentFormInterface>): void {
    this.store.dispatch(StudentAction.getStudentByProperties({ properties }));
  }

  studentExists(properties: Partial<StudentFormInterface>): void {
    this.store.dispatch(StudentAction.studentExists({ properties }));
  }

  studentCount(): void {
    this.store.dispatch(StudentAction.studentCount());
  }

  createStudent(student: StudentFormInterface): void {
    this.store.dispatch(StudentAction.createStudent({ payload: student }));
  }

  updateStudent(student: StudentFormInterface): void {
    this.store.dispatch(StudentAction.updateStudent({ payload: student }));
  }

  deleteStudent(studentId: string): void {
    this.store.dispatch(StudentAction.deleteStudent({ studentId }));
  }

  createManyStudents(students: StudentFormInterface[]): void {
    this.store.dispatch(StudentAction.createManyStudents({ payload: students }));
  }

  updateManyStudents(students: StudentFormInterface[]): void {
    this.store.dispatch(StudentAction.updateManyStudents({ payload: students }));
  }

  deleteManyStudents(studentIds: string[]): void {
    this.store.dispatch(StudentAction.deleteManyStudents({ studentIds }));
  }
}
