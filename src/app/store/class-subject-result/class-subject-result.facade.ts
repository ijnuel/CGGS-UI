import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClassSubjectResultActions from './class-subject-result.actions';
import * as ClassSubjectResultSelectors from './class-subject-result.selector';
import { ClassSubjectResultFormInterface } from '../../types/class-subject-result';

@Injectable({ providedIn: 'root' })
export class ClassSubjectResultFacade {
  all$ = this.store.select(ClassSubjectResultSelectors.selectAllClassSubjectResults);
  loading$ = this.store.select(ClassSubjectResultSelectors.selectClassSubjectResultLoading);
  error$ = this.store.select(ClassSubjectResultSelectors.selectClassSubjectResultError);
  selected$ = this.store.select(ClassSubjectResultSelectors.selectSelectedClassSubjectResult);
  count$ = this.store.select(ClassSubjectResultSelectors.selectClassSubjectResultCount);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(ClassSubjectResultActions.loadClassSubjectResults());
  }

  loadPaginated(page: number, pageSize: number) {
    this.store.dispatch(ClassSubjectResultActions.loadClassSubjectResultsPaginated({ page, pageSize }));
  }

  getById(id: string) {
    this.store.dispatch(ClassSubjectResultActions.getClassSubjectResultById({ id }));
  }

  getByProperties(properties: Partial<ClassSubjectResultFormInterface>) {
    this.store.dispatch(ClassSubjectResultActions.getClassSubjectResultByProperties({ properties }));
  }

  create(form: ClassSubjectResultFormInterface) {
    this.store.dispatch(ClassSubjectResultActions.createClassSubjectResult({ form }));
  }

  update(id: string, form: ClassSubjectResultFormInterface) {
    this.store.dispatch(ClassSubjectResultActions.updateClassSubjectResult({ id, form }));
  }

  delete(id: string) {
    this.store.dispatch(ClassSubjectResultActions.deleteClassSubjectResult({ id }));
  }

  createMany(forms: ClassSubjectResultFormInterface[]) {
    this.store.dispatch(ClassSubjectResultActions.createManyClassSubjectResults({ forms }));
  }

  updateMany(forms: ClassSubjectResultFormInterface[]) {
    this.store.dispatch(ClassSubjectResultActions.updateManyClassSubjectResults({ forms }));
  }

  deleteMany(ids: string[]) {
    this.store.dispatch(ClassSubjectResultActions.deleteManyClassSubjectResults({ ids }));
  }

  count() {
    this.store.dispatch(ClassSubjectResultActions.classSubjectResultCount());
  }

  exists(properties: Partial<ClassSubjectResultFormInterface>) {
    this.store.dispatch(ClassSubjectResultActions.classSubjectResultExists({ properties }));
  }
} 