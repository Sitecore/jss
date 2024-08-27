import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { constants } from '@sitecore-jss/sitecore-jss';
import {
  ComponentRendering,
  getDynamicPlaceholderPattern,
  isDynamicPlaceholder,
} from '@sitecore-jss/sitecore-jss/layout';

@Component({
  selector: 'sc-placeholder-metadata,[placeholderMetadata]',
  template: `
    <ng-template #contentOnly>
      <ng-content></ng-content>
    </ng-template>
    <code
      *ngIf="enabled"
      kind="open"
      type="text/sitecore"
      chrometype="{{ chromeType }}"
      class="scpm"
      [attr.id]="getCodeBlockId('open')"
    ></code>
    <ng-content></ng-content>
    <code
      *ngIf="enabled"
      kind="close"
      type="text/sitecore"
      chrometype="{{ chromeType }}"
      class="scpm"
      [attr.id]="getCodeBlockId('close')"
    ></code>
  `,
})
export class PlaceholderMetadataComponent implements OnInit, OnChanges {
  @Input() rendering: ComponentRendering;
  @Input() enabled: boolean;
  @Input() placeholderName?: string;

  chromeType: string;
  getCodeBlockId = (kind: string): string | undefined => {
    const placeholderName = this.placeholderName;
    const id = this.rendering.uid;

    if (kind === 'open') {
      if (this.chromeType === 'placeholder' && placeholderName) {
        let phId = '';
        for (const placeholder of Object.keys(this.rendering.placeholders || [])) {
          if (placeholderName === placeholder) {
            phId = id
              ? `${placeholderName}_${id}`
              : `${placeholderName}_${constants.DEFAULT_PLACEHOLDER_UID}`;
            break;
          }

          // Check if the placeholder is a dynamic placeholder
          if (isDynamicPlaceholder(placeholder)) {
            const pattern = getDynamicPlaceholderPattern(placeholder);

            // Check if the placeholder matches the dynamic placeholder pattern
            if (pattern.test(placeholderName)) {
              phId = id
                ? `${placeholder}_${id}`
                : `${placeholder}_${constants.DEFAULT_PLACEHOLDER_UID}`;
              break;
            }
          }
        }

        return phId;
      }
    }
    return id;
  };

  ngOnInit(): void {
    this.chromeType = this.placeholderName ? 'placeholder' : 'rendering';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chromeType = changes.placeholderName ? 'placeholder' : 'rendering';
  }
}
