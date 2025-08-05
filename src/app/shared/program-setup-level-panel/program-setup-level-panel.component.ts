import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownListInterface, ProgramSetupLevel, ProgramSetupLevelConfig } from '../../types';

@Component({
  selector: 'app-program-setup-level-panel',
  templateUrl: './program-setup-level-panel.component.html',
  styleUrls: ['./program-setup-level-panel.component.scss']
})
export class ProgramSetupLevelPanelComponent {
  ProgramSetupLevel = ProgramSetupLevel;
  showIcons: boolean = true;

  @Input() items: any[] = [];
  @Input() levelType!: ProgramSetupLevel;
  @Input() config!: ProgramSetupLevelConfig;
  @Input() addFormVisibleFor: string | null = null;
  @Input() loading: boolean = false;

  @Output() edit = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() delete = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() add = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() refresh = new EventEmitter<{ item: any, level: ProgramSetupLevel }>();
  @Output() showAddForm = new EventEmitter<{ id: string, level: ProgramSetupLevel }>();
  @Output() hideAddForm = new EventEmitter<{ level: ProgramSetupLevel }>();
  @Output() submit = new EventEmitter<{ item: any, level: ProgramSetupLevel, config: ProgramSetupLevelConfig }>();

  getId(item: any): string {
    return this.config.getId ? this.config.getId(item) : item.id;
  }

  getName(item: any): string {
    return this.config.getName ? this.config.getName(item) : item.name;
  }

  onRefresh(event: { item: any, level: ProgramSetupLevel }) {
    // Emit refresh for the current level
    this.refresh.emit({ item: event.item, level: event.level });
    // If this is not the top level, bubble up to parent
    if (this.levelType !== this.config.label) {
      this.refresh.emit({ item: event.item, level: this.levelType });
    }
  }
  getDropDownOptions(key: string, item: any): DropdownListInterface[] {
    return this.config.dropDownOptions?.(this.getId(item)).find(x => x.key == key)?.dropDownListFn() ?? [];
  }

  onPanelToggle(isExpanded: boolean) {
      this.showIcons = !isExpanded;
  }

} 