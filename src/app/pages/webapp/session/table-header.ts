import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'name',
    type: 'text',
    name: 'Name',
    align: 'left',
  },
  {
    key: 'startDate',
    type: 'date',
    name: 'Start Date',
    align: 'left',
  },
  {
    key: 'endDate',
    type: 'date',
    name: 'End Date',
    align: 'left',
  },
  {
    key: 'isActive',
    type: 'boolean',
    name: 'Is Active',
    align: 'left',
  }
];
