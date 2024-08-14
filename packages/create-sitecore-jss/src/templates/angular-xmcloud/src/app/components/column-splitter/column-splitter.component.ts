import { Component, OnInit } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-column-splitter',
  templateUrl: './column-splitter.component.html',
})
export class ColumnSplitterComponent extends SxaComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  get columnSplitterStyles(): string {
    return `${this.rendering.params.GridParameters ?? ''} ${this.rendering.params.Styles ??
      ''}`.trimEnd();
  }

  get columnWidths(): string[] {
    return [
      this.rendering.params.ColumnWidth1,
      this.rendering.params.ColumnWidth2,
      this.rendering.params.ColumnWidth3,
      this.rendering.params.ColumnWidth4,
      this.rendering.params.ColumnWidth5,
      this.rendering.params.ColumnWidth6,
      this.rendering.params.ColumnWidth7,
      this.rendering.params.ColumnWidth8,
    ];
  }

  get columnStyles(): string[] {
    return [
      this.rendering.params.Styles1,
      this.rendering.params.Styles2,
      this.rendering.params.Styles3,
      this.rendering.params.Styles4,
      this.rendering.params.Styles5,
      this.rendering.params.Styles6,
      this.rendering.params.Styles7,
      this.rendering.params.Styles8,
    ];
  }

  get enabledPlaceholders(): string[] {
    return this.rendering.params.EnabledPlaceholders.split(',');
  }
}
