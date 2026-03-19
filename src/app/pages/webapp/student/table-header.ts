import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
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
