import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'fullName',
    type: 'text',
    name: 'Full name',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'email',
    type: 'text',
    name: 'Email',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'phone',
    type: 'text',
    name: 'Phone Number',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'status',
    type: 'text',
    name: 'Status',
    sortable: true,
    filterable: true,
    align: 'left',
  }
];
