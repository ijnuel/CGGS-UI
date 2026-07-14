import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  { key: 'title',        type: 'text',    name: 'Title',         sortable: true,  filterable: true,  align: 'left' },
  { key: 'iconName',     type: 'text',    name: 'Icon',          sortable: false, filterable: true,  align: 'left' },
  { key: 'displayOrder', type: 'number',  name: 'Order',         sortable: true,  filterable: false, align: 'center' },
  { key: 'isActive',     type: 'boolean', name: 'Active',        sortable: true,  filterable: false, align: 'center' },
];
