import { Component } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-row-splitter',
  templateUrl: './row-splitter.component.html',
})
export class RowSplitterComponent extends SxaComponent {
  get rowSplitterStyles(): string {
    return `${this.rendering.params.GridParameters ?? ''} ${this.rendering.params.Styles ??
      ''}`.trimEnd();
  }

  get rowStyles(): string[] {
    return Array.from({ length: 8 }, (_, i) => this.rendering.params[`Styles${i + 1}`]);
  }

  get enabledPlaceholders(): string[] {
    return this.rendering.params.EnabledPlaceholders.split(',');
  }

  getRowClass(index: number): string {
    const styleClass = this.rowStyles[index] || '';
    return `${styleClass}`.trim();
  }

  getPlaceholderName(ph: string): string {
    return `row-${ph}-{*}`;
  }
}
