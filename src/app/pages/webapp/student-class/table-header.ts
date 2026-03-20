import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'student',
    type: 'text',
    name: 'Student',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'class',
    type: 'text',
    name: 'Class',
    sortable: true,
    filterable: true,
    align: 'left',
  }
];
