import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  StudentListInterface,
  StudentFormInterface,
  ClassLevelListInterface,
  SessionListInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as StudentAction from './student.actions';
import {
  selectStudentList,
  selectStudentAll,
  selectStudentsWithoutClass,
  selectStudentByProperties,
  selectStudentById,
  selectExists,
  selectCount,
  selectStudentLoading,
  selectStudentError,
  selectStudentCreateSuccess,
  selectStudentUpdateSuccess,
} from './student.selector';
import { StudentState } from './student.reducer';
import { ClassLevelFacade } from '../class-level/class-level.facade';
import { SessionFacade } from '../session/session.facade';

@Injectable({
  providedIn: 'root',
})
export class StudentFacade {
  studentList$: Observable<PaginatedResponseInterface<StudentListInterface[]> | null>;
  studentAll$: Observable<StudentListInterface[] | null>;
  studentsWithoutClass$: Observable<StudentListInterface[] | null>;
  studentByProperties$: Observable<StudentListInterface[] | null>;
  studentById$: Observable<StudentListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(
    private store: Store<{ student: StudentState }>,
    private classLevelFacade: ClassLevelFacade,
    private sessionFacade: SessionFacade,
  ) {
    const classLevelMap$ = this.classLevelFacade.classLevelAll$.pipe(
      map(levels => new Map<string, ClassLevelListInterface>(
        (levels ?? []).map(l => [l.id, l])
      ))
    );

    const sessionMap$ = this.sessionFacade.sessionAll$.pipe(
      map(sessions => new Map<string, SessionListInterface>(
        (sessions ?? []).map(s => [s.id, s])
      ))
    );

    const hydrateStudent = (
      student: StudentListInterface,
      classLevelMap: Map<string, ClassLevelListInterface>,
      sessionMap: Map<string, SessionListInterface>,
    ): StudentListInterface => ({
      ...student,
      studentClasses: (student.studentClasses ?? []).map(sc => ({
        ...sc,
        session: sc.session ?? sessionMap.get(sc.sessionId),
        class: sc.class ? {
          ...sc.class,
          classLevel: sc.class.classLevel ?? (sc.class.classLevelId ? classLevelMap.get(sc.class.classLevelId) : undefined),
        } : sc.class,
        fees: (sc.fees ?? []).map((fee: any) => ({
          ...fee,
          schoolTermSession: fee.schoolTermSession ? {
            ...fee.schoolTermSession,
            session: fee.schoolTermSession.session ?? sessionMap.get(fee.schoolTermSession.sessionId),
          } : fee.schoolTermSession,
        })),
      })),
    });

    const maps$ = combineLatest([classLevelMap$, sessionMap$]);

    this.studentList$ = combineLatest([
      this.store.select(selectStudentList),
      maps$,
    ]).pipe(
      map(([list, [classLevelMap, sessionMap]]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(s => hydrateStudent(s, classLevelMap, sessionMap)) };
      })
    );

    this.studentAll$ = combineLatest([
      this.store.select(selectStudentAll),
      maps$,
    ]).pipe(
      map(([students, [classLevelMap, sessionMap]]) =>
        students ? students.map(s => hydrateStudent(s, classLevelMap, sessionMap)) : students
      )
    );

    this.studentsWithoutClass$ = combineLatest([
      this.store.select(selectStudentsWithoutClass),
      maps$,
    ]).pipe(
      map(([students, [classLevelMap, sessionMap]]) =>
        students ? students.map(s => hydrateStudent(s, classLevelMap, sessionMap)) : students
      )
    );

    this.studentByProperties$ = combineLatest([
      this.store.select(selectStudentByProperties),
      maps$,
    ]).pipe(
      map(([students, [classLevelMap, sessionMap]]) =>
        students ? students.map(s => hydrateStudent(s, classLevelMap, sessionMap)) : students
      )
    );

    this.studentById$ = combineLatest([
      this.store.select(selectStudentById),
      maps$,
    ]).pipe(
      map(([student, [classLevelMap, sessionMap]]) =>
        student ? hydrateStudent(student, classLevelMap, sessionMap) : student
      )
    );

    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectStudentLoading);
    this.error$ = this.store.select(selectStudentError);
    this.createSuccess$ = this.store.select(selectStudentCreateSuccess);
    this.updateSuccess$ = this.store.select(selectStudentUpdateSuccess);

    this.classLevelFacade.getClassLevelAll({ nestedProperties: [{ name: 'programmeType' }] });
    this.sessionFacade.getSessionAll();
  }

  getStudentList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(StudentAction.getStudentList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getStudentAll(query?: QueryInterface): void {
    this.store.dispatch(StudentAction.getStudentAll({ query }));
  }

  getStudentsWithoutClass(sessionId: string): void {
    this.store.dispatch(StudentAction.getStudentsWithoutClass({ sessionId }));
  }

  getStudentById(studentId: string): void {
    this.store.dispatch(StudentAction.getStudentById({ studentId }));
  }

  getStudentByProperties(query: QueryInterface): void {
    this.store.dispatch(StudentAction.getStudentByProperties({ query }));
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
