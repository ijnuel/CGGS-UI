import { TableHeaderInterface } from '../../../types/table';
import { environment } from '../../../../environments/environment';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'photoKey',
    type: 'image',
    name: 'Photo',
    sortable: false,
    filterable: false,
    align: 'center',
    format: (v: string) => v ? `${environment.r2BaseUrl}/${v}` : '',
    fallback: (row: any) => `${row.firstName?.[0] ?? ''}${row.lastName?.[0] ?? ''}`.toUpperCase() || '?',
  },
  {
    name: 'Student No',
    key: 'studentNo',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'First Name',
    key: 'firstName',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Last Name',
    key: 'lastName',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Email',
    key: 'email',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  }
];
