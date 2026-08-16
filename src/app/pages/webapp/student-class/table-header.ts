import { TableHeaderInterface } from '../../../types/table';
import { getClassLabel } from '../../../services/helper.service';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'studentName',
    type: 'text',
    name: 'Student',
    sortable: false,
    filterable: false,
    align: 'left',
    format: (_: any, row: any) =>
      [row?.student?.firstName, row?.student?.lastName].filter(Boolean).join(' ') || '—',
  },
  {
    key: 'studentNo',
    nestedKey: 'student.studentNo',
    type: 'text',
    name: 'Student No',
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
    key: 'sessionName',
    nestedKey: 'session.name',
    type: 'text',
    name: 'Session',
    sortable: false,
    filterable: false,
    align: 'left',
  },
];
