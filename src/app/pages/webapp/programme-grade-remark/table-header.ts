import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Grade',
    key: 'grade',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left',
  },
  {
    name: 'Minimum Score',
    key: 'minimumScore',
    sortable: true,
    filterable: true,
    type: 'number',
    align: 'center',
    format: (value: number) => Number(value ?? 0).toFixed(2),
  },
  {
    name: 'Maximum Score',
    key: 'maximumScore',
    sortable: true,
    filterable: true,
    type: 'number',
    align: 'center',
    format: (value: number) => Number(value ?? 0).toFixed(2),
  },
  {
    name: 'Remark',
    key: 'remark',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left',
  },
];
