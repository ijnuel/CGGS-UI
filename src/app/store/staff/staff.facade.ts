import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  StaffListInterface,
  StaffFormInterface,
  ClassLevelListInterface,
  SubjectListInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as StaffAction from './staff.actions';
import {
  selectStaffList,
  selectStaffAll,
  selectStaffByProperties,
  selectStaffById,
  selectExists,
  selectCount,
  selectStaffLoading,
  selectStaffError,
  selectStaffCreateSuccess,
  selectStaffUpdateSuccess,
} from './staff.selector';
import { StaffState } from './staff.reducer';
import { ClassLevelFacade } from '../class-level/class-level.facade';
import { SubjectFacade } from '../subject/subject.facade';

@Injectable({
  providedIn: 'root',
})
export class StaffFacade {
  staffList$: Observable<PaginatedResponseInterface<StaffListInterface[]> | null>;
  staffAll$: Observable<StaffListInterface[] | null>;
  staffByProperties$: Observable<StaffListInterface[] | null>;
  staffById$: Observable<StaffListInterface | null>;
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
    private store: Store<{ staff: StaffState }>,
    private classLevelFacade: ClassLevelFacade,
    private subjectFacade: SubjectFacade,
  ) {
    const classLevelMap$ = this.classLevelFacade.classLevelAll$.pipe(
      map(levels => new Map<string, ClassLevelListInterface>(
        (levels ?? []).map(l => [l.id, l])
      ))
    );

    const subjectMap$ = this.subjectFacade.subjectAll$.pipe(
      map(subjects => new Map<string, SubjectListInterface>(
        (subjects ?? []).map(s => [s.id, s])
      ))
    );

    const hydrateStaff = (
      staff: StaffListInterface,
      classLevelMap: Map<string, ClassLevelListInterface>,
      subjectMap: Map<string, SubjectListInterface>,
    ): StaffListInterface => ({
      ...staff,
      classSubjects: (staff.classSubjects ?? []).map(cs => ({
        ...cs,
        subject: cs.subject ?? subjectMap.get(cs.subjectId),
        class: cs.class ? {
          ...cs.class,
          classLevel: cs.class.classLevel ?? (cs.class.classLevelId ? classLevelMap.get(cs.class.classLevelId) : undefined),
        } : cs.class,
      })),
    });

    const maps$ = combineLatest([classLevelMap$, subjectMap$]);

    this.staffList$ = combineLatest([
      this.store.select(selectStaffList),
      maps$,
    ]).pipe(
      map(([list, [classLevelMap, subjectMap]]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(s => hydrateStaff(s, classLevelMap, subjectMap)) };
      })
    );

    this.staffAll$ = combineLatest([
      this.store.select(selectStaffAll),
      maps$,
    ]).pipe(
      map(([staff, [classLevelMap, subjectMap]]) =>
        staff ? staff.map(s => hydrateStaff(s, classLevelMap, subjectMap)) : staff
      )
    );

    this.staffByProperties$ = combineLatest([
      this.store.select(selectStaffByProperties),
      maps$,
    ]).pipe(
      map(([staff, [classLevelMap, subjectMap]]) =>
        staff ? staff.map(s => hydrateStaff(s, classLevelMap, subjectMap)) : staff
      )
    );

    this.staffById$ = combineLatest([
      this.store.select(selectStaffById),
      maps$,
    ]).pipe(
      map(([staff, [classLevelMap, subjectMap]]) =>
        staff ? hydrateStaff(staff, classLevelMap, subjectMap) : staff
      )
    );

    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectStaffLoading);
    this.error$ = this.store.select(selectStaffError);
    this.createSuccess$ = this.store.select(selectStaffCreateSuccess);
    this.updateSuccess$ = this.store.select(selectStaffUpdateSuccess);

    this.classLevelFacade.getClassLevelAll({ nestedProperties: [{ name: 'programmeType' }] });
    this.subjectFacade.getSubjectAll();
  }

  getStaffList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(StaffAction.getStaffList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getStaffAll(query?: QueryInterface): void {
    this.store.dispatch(StaffAction.getStaffAll({ query }));
  }

  getStaffById(staffId: string): void {
    this.store.dispatch(StaffAction.getStaffById({ staffId }));
  }

  getStaffByProperties(query: QueryInterface): void {
    this.store.dispatch(StaffAction.getStaffByProperties({ query }));
  }

  staffExists(properties: Partial<StaffFormInterface>): void {
    this.store.dispatch(StaffAction.staffExists({ properties }));
  }

  staffCount(): void {
    this.store.dispatch(StaffAction.staffCount());
  }

  createStaff(staff: StaffFormInterface): void {
    this.store.dispatch(StaffAction.createStaff({ payload: staff }));
  }

  updateStaff(staff: StaffFormInterface): void {
    this.store.dispatch(StaffAction.updateStaff({ payload: staff }));
  }

  deleteStaff(staffId: string): void {
    this.store.dispatch(StaffAction.deleteStaff({ staffId }));
  }

  createManyStaffs(staffs: StaffFormInterface[]): void {
    this.store.dispatch(StaffAction.createManyStaffs({ payload: staffs }));
  }

  updateManyStaffs(staffs: StaffFormInterface[]): void {
    this.store.dispatch(StaffAction.updateManyStaffs({ payload: staffs }));
  }

  deleteManyStaffs(staffIds: string[]): void {
    this.store.dispatch(StaffAction.deleteManyStaffs({ staffIds }));
  }
}
