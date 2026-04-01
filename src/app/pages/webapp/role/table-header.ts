import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'name',
    type: 'text',
    name: 'Role Name',
    sortable: true,
    filterable: true,
    align: 'left',
  },
{
    key: 'permissions',
    type: 'text',
    name: 'Permissions',
    sortable: false,
    filterable: false,
    align: 'center',
    format: (value: any[]) => value?.length?.toString() ?? '0',
  },
];
