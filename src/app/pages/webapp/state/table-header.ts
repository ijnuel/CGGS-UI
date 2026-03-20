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
    key: 'code',
    type: 'text',
    name: 'Code',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'country',
    type: 'text',
    name: 'Country',
    sortable: true,
    filterable: true,
    align: 'left',
  }
];
