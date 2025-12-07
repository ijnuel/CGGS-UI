import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Minimum Score',
    key: 'minimumScore',
    type: 'number',
    align: 'center',
    format: (value: number) => Number(value ?? 0).toFixed(2),
  },
  {
    name: 'Maximum Score',
    key: 'maximumScore',
    type: 'number',
    align: 'center',
    format: (value: number) => Number(value ?? 0).toFixed(2),
  },
  {
    name: 'Remark',
    key: 'remark',
    type: 'text',
    align: 'left',
  },
];
