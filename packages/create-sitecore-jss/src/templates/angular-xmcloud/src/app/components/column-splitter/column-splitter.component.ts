import { Component } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-column-splitter',
  templateUrl: './column-splitter.component.html',
  host: {
    'class': 'row component column-splitter',
    '[class]': 'columnSplitterStyles',
    '[id]' : 'id'
  }
})
export class ColumnSplitterComponent extends SxaComponent {
  get columnSplitterStyles(): string {
    return `${this.rendering.params.GridParameters ?? ''} ${this.rendering.params.Styles ??
      ''}`.trimEnd();
  }

  get columnWidths(): string[] {
    return Array.from({ length: 8 }, (_, i) => this.rendering.params[`ColumnWidth${i + 1}`]);
  }

  get columnStyles(): string[] {
    return Array.from({ length: 8 }, (_, i) => this.rendering.params[`Styles${i + 1}`]);
  }

  get enabledPlaceholders(): string[] {
    return this.rendering.params.EnabledPlaceholders.split(',');
  }

  getColumnClass(index: number): string {
    const widthClass = this.columnWidths[index] || '';
    const styleClass = this.columnStyles[index] || '';
    return `${widthClass} ${styleClass}`.trim();
  }

  getPlaceholderName(ph: string): string {
    return `column-${ph}-{*}`;
  }
}
