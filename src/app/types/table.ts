export interface TableHeaderInterface {
  name: string;
  key: string;
  nestedKey?: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean';
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any, row?: any) => string;
}

export interface TableActionInterface {
  key: string;
  label: string;
  icon: string;
  iconClass?: string;  // e.g. '!text-green-600'
  disabled?: (row: any) => boolean;
  show?: (row: any) => boolean;
}
