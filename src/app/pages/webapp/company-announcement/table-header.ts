import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  { key: 'title',            type: 'text',    name: 'Title',            sortable: true,  filterable: true,  align: 'left' },
  { key: 'category',         type: 'text',    name: 'Category',         sortable: true,  filterable: true,  align: 'left' },
  { key: 'location',         type: 'text',    name: 'Location',         sortable: false, filterable: true,  align: 'left' },
  { key: 'announcementDate', type: 'date',    name: 'Date',             sortable: true,  filterable: false, align: 'left' },
  { key: 'isActive',         type: 'boolean', name: 'Active',           sortable: true,  filterable: false, align: 'center' },
];
