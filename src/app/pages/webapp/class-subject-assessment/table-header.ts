import { TableHeaderInterface } from '../../../types/table';
import { getClassLabel } from '../../../services/helper.service';

export const tableHeader: TableHeaderInterface[] = [
  {
    key: 'assessmentType',
    type: 'text',
    name: 'Assessment Type',
    sortable: true,
    filterable: true,
    align: 'left',
  },
  {
    key: 'scoreWeigth',
    type: 'text',
    name: 'Score Weight (%)',
    sortable: true,
    filterable: false,
    align: 'right',
  },
  {
    key: 'subjectName',
    nestedKey: 'classSubject.subject.name',
    type: 'text',
    name: 'Subject',
    sortable: false,
    filterable: false,
    align: 'left',
  },
  {
    key: 'classLabel',
    type: 'text',
    name: 'Class',
    sortable: false,
    filterable: false,
    align: 'left',
    format: (_: any, row: any) => getClassLabel(row?.classSubject?.class) || row?.classSubject?.class?.name || '—',
  },
];
