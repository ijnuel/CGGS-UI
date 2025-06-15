import { TableHeaderInterface } from '../../../types/table';

export const tableHeader: TableHeaderInterface[] = [
  // {
  //   name: 'Id',
  //   key: 'id',
  //   filterable: true,
  //   type: 'text',
  //   align: 'left'
  // },
  {
    name: 'Name',
    key: 'name',
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Level',
    key: 'level',
    filterable: true,
    type: 'number',
    align: 'right'
  }
];
export const assessmentTypeTableHeader: TableHeaderInterface[] = [
  {
    name: 'Assessment Type',
    key: 'assessmentType',
    filterable: true,
    type: 'text',
    align: 'left'
  },
  {
    name: 'Score Weight',
    key: 'scoreWeigth',
    filterable: true,
    type: 'number',
    align: 'right'
  }
];
