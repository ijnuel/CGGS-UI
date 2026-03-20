import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'name',
    type: 'text',
    name: 'Name',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'address',
    type: 'text',
    name: 'Address',
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
    key: 'email',
    type: 'text',
    name: 'Email',
    sortable: true,
    filterable: true,
    align: 'left',
  }
];
