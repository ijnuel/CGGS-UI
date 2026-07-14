export interface CompanyAnnouncementListInterface {
  id: string;
  title?: string;
  body?: string;
  category?: string;
  iconName?: string;
  location?: string;
  announcementDate?: string;
  isActive?: boolean;
  companyId?: string;
}

export interface CompanyAnnouncementFormInterface {
  id?: string;
  title: string;
  body: string;
  category?: string;
  iconName?: string;
  location?: string;
  announcementDate: string;
  isActive?: boolean;
}
