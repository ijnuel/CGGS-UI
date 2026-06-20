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
    key: 'shortName',
    type: 'text',
    name: 'Short Name',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'principalName',
    type: 'text',
    name: 'Principal',
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
    key: 'domainName',
    type: 'text',
    name: 'Domain',
    sortable: true,
    filterable: true,
    align: 'left',
  },
];
