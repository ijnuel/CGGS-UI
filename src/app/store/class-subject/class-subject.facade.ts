import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ClassSubjectActions from './class-subject.actions';
import * as ClassSubjectSelectors from './class-subject.selector';
import { ClassSubjectFormInterface } from '../../types/class-subject';

@Injectable({ providedIn: 'root' })
export class ClassSubjectFacade {
  all$ = this.store.select(ClassSubjectSelectors.selectAllClassSubjects);
  loading$ = this.store.select(ClassSubjectSelectors.selectClassSubjectLoading);
  error$ = this.store.select(ClassSubjectSelectors.selectClassSubjectError);
  selected$ = this.store.select(ClassSubjectSelectors.selectSelectedClassSubject);
  count$ = this.store.select(ClassSubjectSelectors.selectClassSubjectCount);

  constructor(private store: Store) {}

  loadAll() {
    this.store.dispatch(ClassSubjectActions.loadClassSubjects());
  }

  loadPaginated(page: number, pageSize: number) {
    this.store.dispatch(ClassSubjectActions.loadClassSubjectsPaginated({ page, pageSize }));
  }

  getById(id: string) {
    this.store.dispatch(ClassSubjectActions.getClassSubjectById({ id }));
  }

  getByProperties(properties: Partial<ClassSubjectFormInterface>) {
    this.store.dispatch(ClassSubjectActions.getClassSubjectByProperties({ properties }));
  }

  create(form: ClassSubjectFormInterface) {
    this.store.dispatch(ClassSubjectActions.createClassSubject({ form }));
  }

  update(id: string, form: ClassSubjectFormInterface) {
    this.store.dispatch(ClassSubjectActions.updateClassSubject({ id, form }));
  }

  delete(id: string) {
    this.store.dispatch(ClassSubjectActions.deleteClassSubject({ id }));
  }

  createMany(forms: ClassSubjectFormInterface[]) {
    this.store.dispatch(ClassSubjectActions.createManyClassSubjects({ forms }));
  }

  updateMany(forms: ClassSubjectFormInterface[]) {
    this.store.dispatch(ClassSubjectActions.updateManyClassSubjects({ forms }));
  }

  deleteMany(ids: string[]) {
    this.store.dispatch(ClassSubjectActions.deleteManyClassSubjects({ ids }));
  }

  addSubjectToClass(classId: string, subjectId: string) {
    this.store.dispatch(ClassSubjectActions.addSubjectToClass({ classId, subjectId }));
  }

  count() {
    this.store.dispatch(ClassSubjectActions.classSubjectCount());
  }

  exists(properties: Partial<ClassSubjectFormInterface>) {
    this.store.dispatch(ClassSubjectActions.classSubjectExists({ properties }));
  }
} 