import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PageQueryInterface } from '../../types';
import { CompanyGalleryImageFormInterface } from '../../types/company-gallery-image';
import { CompanyGalleryImageState } from './company-gallery-image.reducer';
import * as CompanyGalleryImageActions from './company-gallery-image.actions';
import * as CompanyGalleryImageSelectors from './company-gallery-image.selector';

@Injectable({ providedIn: 'root' })
export class CompanyGalleryImageFacade {
  companyGalleryImageList$  = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageList);
  companyGalleryImageAll$   = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageAll);
  companyGalleryImageById$  = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageById);
  loading$       = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageLoading);
  error$         = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageError);
  createSuccess$ = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageCreateSuccess);
  updateSuccess$ = this.store.select(CompanyGalleryImageSelectors.selectCompanyGalleryImageUpdateSuccess);

  currentPageQuery: PageQueryInterface = { start: 0, recordsPerPage: 10, pageIndex: 0, searchText: '' };

  constructor(private store: Store<{ companyGalleryImage: CompanyGalleryImageState }>) {}

  getCompanyGalleryImageList(pageQuery: PageQueryInterface) {
    this.currentPageQuery = pageQuery;
    this.store.dispatch(CompanyGalleryImageActions.getCompanyGalleryImageList({ pageQuery }));
  }

  getCompanyGalleryImageAll(query?: any) {
    this.store.dispatch(CompanyGalleryImageActions.getCompanyGalleryImageAll({ query }));
  }

  getCompanyGalleryImageById(id: string) {
    this.store.dispatch(CompanyGalleryImageActions.getCompanyGalleryImageById({ companyGalleryImageId: id }));
  }

  createCompanyGalleryImage(payload: CompanyGalleryImageFormInterface) {
    this.store.dispatch(CompanyGalleryImageActions.createCompanyGalleryImage({ payload }));
  }

  updateCompanyGalleryImage(payload: CompanyGalleryImageFormInterface) {
    this.store.dispatch(CompanyGalleryImageActions.updateCompanyGalleryImage({ payload }));
  }

  deleteCompanyGalleryImage(id: string) {
    this.store.dispatch(CompanyGalleryImageActions.deleteCompanyGalleryImage({ companyGalleryImageId: id }));
  }
}
