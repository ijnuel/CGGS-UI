import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Description',
    key: 'description',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left',
    format: (_: any, row: any) => {
      const programmeType = row?.classLevel?.programmeType?.name ?? '';
      const level = row?.classLevel?.level ?? '';
      const name = row?.name ?? '';
      return [programmeType, level, name].filter(Boolean).join(' ');
    }
  }
];
