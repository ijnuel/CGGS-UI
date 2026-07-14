export interface CompanyCoreValueListInterface {
  id: string;
  title?: string;
  body?: string;
  iconName?: string;
  displayOrder?: number;
  isActive?: boolean;
  companyId?: string;
}

export interface CompanyCoreValueFormInterface {
  id?: string;
  title: string;
  body: string;
  iconName?: string;
  displayOrder?: number;
  isActive?: boolean;
}
