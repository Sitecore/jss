import { Component, HostBinding, Input } from '@angular/core';
import { MetadataKind } from '@sitecore-jss/sitecore-jss/editing';

/**
 * Component that renders a field' metadata chrome element.
 */
@Component({
  selector: 'code[scFieldMetadataMarker]',
  template: '{{ metadataString }}',
  host: {
    '[attr.type]': '"text/sitecore"',
    '[attr.chrometype]': '"field"',
    '[class]': '"scpm"',
  },
})
export class FieldMetadataMarkerComponent {
  @Input()
  metadata?: any;

  @HostBinding('attr.kind')
  @Input()
  kind: MetadataKind = MetadataKind.Open;

  get metadataString(): string {
    return this.metadata ? JSON.stringify(this.metadata) : '';
  }
}
