import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface ProgramSetupLevelConfig {
  label: string;
  formGroup: FormGroup;
  submitHandler: (parent: any) => void;
  childItemsFn: (id: string) => any[];
  childConfig?: ProgramSetupLevelConfig;
  getName?: (item: any) => string;
  getId?: (item: any) => string;
  showTable?: boolean;
  tableHeaderData?: any[];
  getTableData?: (id: string) => any[];
  showAddButton?: boolean;
}

@Component({
  selector: 'app-program-setup-level-panel',
  templateUrl: './program-setup-level-panel.component.html',
  styleUrls: ['./program-setup-level-panel.component.scss']
})
export class ProgramSetupLevelPanelComponent {
  @Input() items: any[] = [];
  @Input() levelType!: string;
  @Input() config!: ProgramSetupLevelConfig;
  @Input() addFormVisibleFor: string | null = null;
  @Input() loading: boolean = false;

  @Output() edit = new EventEmitter<{ item: any, level: string }>();
  @Output() delete = new EventEmitter<{ item: any, level: string }>();
  @Output() add = new EventEmitter<{ item: any, level: string }>();
  @Output() refresh = new EventEmitter<{ item: any, level: string }>();
  @Output() showAddForm = new EventEmitter<{ id: string, level: string }>();
  @Output() hideAddForm = new EventEmitter<{ level: string }>();
  @Output() submit = new EventEmitter<{ item: any, level: string, config: ProgramSetupLevelConfig }>();

  getId(item: any): string {
    return this.config.getId ? this.config.getId(item) : item.id;
  }

  getName(item: any): string {
    return this.config.getName ? this.config.getName(item) : item.name;
  }
} 