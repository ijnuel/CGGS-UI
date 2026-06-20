import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ClassListInterface,
  ClassFormInterface,
  ClassLevelListInterface,
  PageQueryInterface,
  PaginatedResponseInterface,
  QueryInterface,
} from '../../types';
import * as ClassAction from './class.actions';
import {
  selectClassList,
  selectClassAll,
  selectClassByProperties,
  selectClassById,
  selectExists,
  selectCount,
  selectClassLoading,
  selectClassError,
  selectClassCreateSuccess,
  selectClassUpdateSuccess,
  selectClassDeleteSuccess,
} from './class.selector';
import { ClassState } from './class.reducer';
import { ClassLevelFacade } from '../class-level/class-level.facade';

@Injectable({
  providedIn: 'root',
})
export class ClassFacade {
  classList$: Observable<PaginatedResponseInterface<ClassListInterface[]> | null>;
  classAll$: Observable<ClassListInterface[] | null>;
  classByProperties$: Observable<ClassListInterface[] | null>;
  classById$: Observable<ClassListInterface | null>;
  exists$: Observable<boolean | null>;
  count$: Observable<number | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  createSuccess$: Observable<boolean>;
  updateSuccess$: Observable<boolean>;
  deleteSuccess$: Observable<boolean>;
  currentPageQuery: PageQueryInterface = {
    start: 0,
    recordsPerPage: 10,
    pageIndex: 0,
    searchText: ''
  };

  constructor(
    private store: Store<{ class: ClassState }>,
    private classLevelFacade: ClassLevelFacade,
  ) {
    // Backend's Class endpoints return classLevel: null even when nestedProperties
    // is sent. Hydrate classLevel in the facade from the classLevelAll$ store so
    // every consumer (dropdowns, tables) sees the populated object.
    const hydrate = <T extends ClassListInterface | null | undefined>(
      cls: T,
      classLevelMap: Map<string, ClassLevelListInterface>,
    ): T => {
      if (!cls) return cls;
      return {
        ...cls,
        classLevel: cls.classLevel ?? (cls.classLevelId ? classLevelMap.get(cls.classLevelId) : undefined),
      } as T;
    };

    const classLevelMap$ = this.classLevelFacade.classLevelAll$.pipe(
      map(levels => new Map<string, ClassLevelListInterface>(
        (levels ?? []).map(l => [l.id, l])
      ))
    );

    this.classList$ = combineLatest([
      this.store.select(selectClassList),
      classLevelMap$,
    ]).pipe(
      map(([list, classLevelMap]) => {
        if (!list) return list;
        return { ...list, data: list.data.map(c => hydrate(c, classLevelMap)) };
      })
    );
    this.classAll$ = combineLatest([
      this.store.select(selectClassAll),
      classLevelMap$,
    ]).pipe(
      map(([classes, classLevelMap]) =>
        classes ? classes.map(c => hydrate(c, classLevelMap)) : classes
      )
    );
    this.classByProperties$ = combineLatest([
      this.store.select(selectClassByProperties),
      classLevelMap$,
    ]).pipe(
      map(([classes, classLevelMap]) =>
        classes ? classes.map(c => hydrate(c, classLevelMap)) : classes
      )
    );
    this.classById$ = combineLatest([
      this.store.select(selectClassById),
      classLevelMap$,
    ]).pipe(
      map(([cls, classLevelMap]) => hydrate(cls, classLevelMap))
    );

    this.exists$ = this.store.select(selectExists);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectClassLoading);
    this.error$ = this.store.select(selectClassError);
    this.createSuccess$ = this.store.select(selectClassCreateSuccess);
    this.deleteSuccess$ = this.store.select(selectClassDeleteSuccess);
    this.updateSuccess$ = this.store.select(selectClassUpdateSuccess);

    // Ensure class levels (with programmeType) are always loaded so hydration
    // produces labels with the full prefix/level even on first load.
    this.classLevelFacade.getClassLevelAll({
      nestedProperties: [{ name: 'programmeType' }],
    });
  }

  getClassList(pageQuery: PageQueryInterface): void {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(ClassAction.getClassList({ pageQuery }));
  }

  getCurrentPageQuery(): PageQueryInterface {
    return this.currentPageQuery;
  }

  getClassAll(query?: QueryInterface): void {
    this.store.dispatch(ClassAction.getClassAll({ query }));
  }

  getClassById(classId: string): void {
    this.store.dispatch(ClassAction.getClassById({ classId }));
  }

  getClassByProperties(properties: Partial<ClassFormInterface>): void {
    this.store.dispatch(ClassAction.getClassByProperties({ properties }));
  }

  classExists(properties: Partial<ClassFormInterface>): void {
    this.store.dispatch(ClassAction.classExists({ properties }));
  }

  classCount(): void {
    this.store.dispatch(ClassAction.classCount());
  }

  createClass(classDto: ClassFormInterface): void {
    this.store.dispatch(ClassAction.createClass({ payload: classDto }));
  }

  updateClass(classDto: ClassFormInterface): void {
    this.store.dispatch(ClassAction.updateClass({ payload: classDto }));
  }

  deleteClass(classId: string): void {
    this.store.dispatch(ClassAction.deleteClass({ classId }));
  }

  createManyClasss(classes: ClassFormInterface[]): void {
    this.store.dispatch(ClassAction.createManyClasss({ payload: classes }));
  }

  updateManyClasss(classes: ClassFormInterface[]): void {
    this.store.dispatch(ClassAction.updateManyClasss({ payload: classes }));
  }

  deleteManyClasss(classIds: string[]): void {
    this.store.dispatch(ClassAction.deleteManyClasss({ classIds }));
  }
}
