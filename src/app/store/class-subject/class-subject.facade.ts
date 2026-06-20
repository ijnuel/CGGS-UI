import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassSubjectListInterface,
  ClassSubjectFormInterface,
  ClassLevelListInterface,
  SubjectListInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as ClassSubjectAction from './class-subject.actions';
import {
  selectClassSubjectList,
  selectClassSubjectAll,
  selectClassSubjectByProperties,
  selectClassSubjectById,
  selectExists,
  selectCount,
  selectClassSubjectLoading,
  selectClassSubjectError,
  selectClassSubjectCreateSuccess,
  selectClassSubjectUpdateSuccess,
  selectClassSubjectDeleteSuccess,
  selectAddSubjectToClassResult,
  selectDataImportTemplate,
} from './class-subject.selector';
import { ClassSubjectState } from './class-subject.reducer';
import { ClassLevelFacade } from '../class-level/class-level.facade';
import { SubjectFacade } from '../subject/subject.facade';

@Injectable({
  providedIn: 'root',
})
export class ClassSubjectFacade {
  classSubjectList$: Observable<PaginatedResponseInterface<ClassSubjectListInterface[]> | null>;
  classSubjectAll$: Observable<ClassSubjectListInterface[] | null>;
  classSubjectByProperties$: Observable<ClassSubjectListInterface | null>;
  classSubjectById$: Observable<ClassSubjectListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;
  addSubjectToClassResult$: Observable<string | null>;
  dataImportTemplate$: Observable<any | null>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(
    private store: Store<{ classSubject: ClassSubjectState }>,
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

    const hydrate = (
      cs: ClassSubjectListInterface,
      classLevelMap: Map<string, ClassLevelListInterface>,
      subjectMap: Map<string, SubjectListInterface>,
    ): ClassSubjectListInterface => ({
      ...cs,
      subject: cs.subject ?? subjectMap.get(cs.subjectId),
      class: cs.class ? {
        ...cs.class,
        classLevel: cs.class.classLevel ?? (cs.class.classLevelId ? classLevelMap.get(cs.class.classLevelId) : undefined),
      } : cs.class,
    });

    const maps$ = combineLatest([classLevelMap$, subjectMap$]);

    this.classSubjectList$ = combineLatest([
      this.store.select(selectClassSubjectList),
      maps$,
    ]).pipe(
      map(([list, [classLevelMap, subjectMap]]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(cs => hydrate(cs, classLevelMap, subjectMap)) };
      })
    );

    this.classSubjectAll$ = combineLatest([
      this.store.select(selectClassSubjectAll),
      maps$,
    ]).pipe(
      map(([items, [classLevelMap, subjectMap]]) =>
        items ? items.map(cs => hydrate(cs, classLevelMap, subjectMap)) : items
      )
    );

    this.classSubjectByProperties$ = combineLatest([
      this.store.select(selectClassSubjectByProperties),
      maps$,
    ]).pipe(
      map(([cs, [classLevelMap, subjectMap]]) =>
        cs ? hydrate(cs, classLevelMap, subjectMap) : cs
      )
    );

    this.classSubjectById$ = combineLatest([
      this.store.select(selectClassSubjectById),
      maps$,
    ]).pipe(
      map(([cs, [classLevelMap, subjectMap]]) =>
        cs ? hydrate(cs, classLevelMap, subjectMap) : cs
      )
    );

    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassSubjectLoading);
    this.error$ = this.store.select(selectClassSubjectError);
    this.createSuccess$ = this.store.select(selectClassSubjectCreateSuccess);
    this.updateSuccess$ = this.store.select(selectClassSubjectUpdateSuccess);
    this.deleteSuccess$ = this.store.select(selectClassSubjectDeleteSuccess);
    this.addSubjectToClassResult$ = this.store.select(selectAddSubjectToClassResult);
    this.dataImportTemplate$ = this.store.select(selectDataImportTemplate);

    this.classLevelFacade.getClassLevelAll({ nestedProperties: [{ name: 'programmeType' }] });
    this.subjectFacade.getSubjectAll();
  }

  getClassSubjectList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassSubjectAction.getClassSubjectList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassSubjectAll(query?: QueryInterface): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectAll({ query }));
  }

  getClassSubjectById(classSubjectId: string): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectById({ classSubjectId }));
  }

  getClassSubjectByProperties(properties: Partial<ClassSubjectFormInterface>): void {
    const queryPropertiesString = JSON.stringify(
      Object.entries(properties).map(([Name, Value]) => ({ Name, Value }))
    );
    this.store.dispatch(ClassSubjectAction.getClassSubjectByProperties({ queryPropertiesString }));
  }

  classSubjectExists(properties: Partial<ClassSubjectFormInterface>): void {
    this.store.dispatch(ClassSubjectAction.classSubjectExists({ properties }));
  }

  classSubjectCount(): void {
    this.store.dispatch(ClassSubjectAction.classSubjectCount());
  }

  createClassSubject(classSubject: ClassSubjectFormInterface): void {
    this.store.dispatch(ClassSubjectAction.createClassSubject({ payload: classSubject }));
  }

  updateClassSubject(classSubject: ClassSubjectFormInterface): void {
    this.store.dispatch(ClassSubjectAction.updateClassSubject({ payload: classSubject }));
  }

  deleteClassSubject(classSubjectId: string): void {
    this.store.dispatch(ClassSubjectAction.deleteClassSubject({ classSubjectId }));
  }

  createManyClassSubjects(classSubjects: ClassSubjectFormInterface[]): void {
    this.store.dispatch(ClassSubjectAction.createManyClassSubjects({ payload: classSubjects }));
  }

  updateManyClassSubjects(classSubjects: ClassSubjectFormInterface[]): void {
    this.store.dispatch(ClassSubjectAction.updateManyClassSubjects({ payload: classSubjects }));
  }

  deleteManyClassSubjects(classSubjectIds: string[]): void {
    this.store.dispatch(ClassSubjectAction.deleteManyClassSubjects({ classSubjectIds }));
  }

  addSubjectToClass(payload: any): void {
    this.store.dispatch(ClassSubjectAction.addSubjectToClass({ payload }));
  }

  getClassSubjectDataImportTemplate(): void {
    this.store.dispatch(ClassSubjectAction.getClassSubjectDataImportTemplate());
  }
}
