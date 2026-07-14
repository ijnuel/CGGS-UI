export interface CompanyGalleryImageListInterface {
  id: string;
  imageUrl?: string;
  caption?: string;
  displayOrder?: number;
  isActive?: boolean;
  companyId?: string;
}

export interface CompanyGalleryImageFormInterface {
  id?: string;
  imageUrl: string;
  caption?: string;
  displayOrder?: number;
  isActive?: boolean;
}
