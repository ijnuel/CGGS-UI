import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  // {
  //   name: 'Id',
  //   key: 'id',
  //   filterable: true,
  //   type: 'text',
  //   align: 'left'
  // },
  {
    name: 'Name',
    key: 'name',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Subject Type',
    key: 'subjectType',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left'
  }
];
