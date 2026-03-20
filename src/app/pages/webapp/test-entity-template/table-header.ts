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
    name: 'Test Name',
    key: 'testName',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Another Name',
    key: 'anotherName',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  }
];
