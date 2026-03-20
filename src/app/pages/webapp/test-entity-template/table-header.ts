import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Id',
    key: 'id',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Name',
    key: 'name',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  }
];
