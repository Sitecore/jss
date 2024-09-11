import { Component, HostBinding, Input } from '@angular/core';

/**
 * Component that renders a field' metadata chrome element.
 */
@Component({
  selector: 'code[scFieldMetadataMarker]',
  template: '{{ metadataString }}',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property -- the only way to set static attributes
  host: {
    '[attr.type]': '"text/sitecore"',
    '[attr.chrometype]': '"field"',
    '[class]': '"scpm"',
  },
})
export class FieldMetadataMarkerComponent {
  @Input()
  metadata?: any;

  get metadataString(): string {
    return this.metadata ? JSON.stringify(this.metadata) : '';
  }

  @HostBinding('attr.kind')
  @Input()
  kind: 'open' | 'close' = 'open';
}
