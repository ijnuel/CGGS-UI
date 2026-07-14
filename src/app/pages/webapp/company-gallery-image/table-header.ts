import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  { key: 'imageUrl',     type: 'image',   name: 'Image',         sortable: false, filterable: false, align: 'left' },
  { key: 'caption',      type: 'text',    name: 'Caption',       sortable: false, filterable: true,  align: 'left' },
  { key: 'displayOrder', type: 'number',  name: 'Order',         sortable: true,  filterable: false, align: 'center' },
  { key: 'isActive',     type: 'boolean', name: 'Active',        sortable: true,  filterable: false, align: 'center' },
];
