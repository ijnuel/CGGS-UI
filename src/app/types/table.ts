export interface TableHeaderInterface {
  name: string;
  key: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean';
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
}
