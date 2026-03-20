import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'session',
    type: 'text',
    name: 'Session',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'termString',
    type: 'text',
    name: 'Term',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'termStartDate',
    type: 'text',
    name: 'Term Start Date',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'termEndDate',
    type: 'text',
    name: 'Term End Date',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'noOfOpenedDays',
    type: 'number',
    name: 'Number of Opened Days',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'isCurrent',
    type: 'boolean',
    name: 'Is Current',
    sortable: true,
    filterable: true,
    align: 'left',
  }
];
