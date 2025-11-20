import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'session',
    type: 'text',
    name: 'Session',
    align: 'left',
  },
  {
    key: 'termString',
    type: 'text',
    name: 'Term',
    align: 'left',
  },
  {
    key: 'termStartDate',
    type: 'text',
    name: 'Term Start Date',
    align: 'left',
  },
  {
    key: 'termEndDate',
    type: 'text',
    name: 'Term End Date',
    align: 'left',
  },
  {
    key: 'isCurrent',
    type: 'boolean',
    name: 'Is Current',
    align: 'left',
  }
];