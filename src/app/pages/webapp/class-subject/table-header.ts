import { TableHeaderInterface } from '../../../types/table';
import { getClassLabel } from '../../../services/helper.service';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'subjectName',
    nestedKey: 'subject.name',
    type: 'text',
    name: 'Subject',
    sortable: false,
    filterable: false,
    align: 'left',
  },
  {
    key: 'className',
    type: 'text',
    name: 'Class',
    sortable: false,
    filterable: false,
    align: 'left',
    format: (_: any, row: any) => getClassLabel(row?.class) || row?.class?.name || '—',
  },
  {
    key: 'staffName',
    type: 'text',
    name: 'Staff',
    sortable: false,
    filterable: false,
    align: 'left',
    format: (_: any, row: any) =>
      [row?.staff?.firstName, row?.staff?.lastName].filter(Boolean).join(' ') || '—',
  },
  {
    key: 'termString',
    nestedKey: 'schoolTermSession.termString',
    type: 'text',
    name: 'Term',
    sortable: false,
    filterable: false,
    align: 'left',
  },
  {
    key: 'isActive',
    type: 'text',
    name: 'Active',
    sortable: false,
    filterable: false,
    align: 'center',
    format: (v: boolean) => v ? 'Yes' : 'No',
  },
];
