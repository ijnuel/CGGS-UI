import { TableHeaderInterface } from '../../../types/table';
import { getClassLabel } from '../../../services/helper.service';

export const tableHeader: TableHeaderInterface[] = [
  {
    name: 'Description',
    key: 'description',
    sortable: true,
    filterable: true,
    type: 'text',
    align: 'left',
    format: (_: any, row: any) => getClassLabel(row)
  },
  {
    name: 'Form Teacher',
    key: 'staffName',
    nestedKey: 'staff.firstName',
    sortable: false,
    filterable: false,
    type: 'text',
    align: 'left',
    format: (_: any, row: any) => {
      const first = row?.staff?.firstName ?? '';
      const last = row?.staff?.lastName ?? '';
      return [first, last].filter(Boolean).join(' ') || '—';
    }
  }
];
