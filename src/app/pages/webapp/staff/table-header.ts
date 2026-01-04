import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Staff No',
    key: 'staffNo',
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'First Name',
    key: 'firstName',
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Last Name',
    key: 'lastName',
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Email',
    key: 'email',
    filterable: true,
    type: 'text',
    align: 'left'
  }
];
