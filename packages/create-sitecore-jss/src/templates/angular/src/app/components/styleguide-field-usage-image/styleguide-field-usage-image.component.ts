import { Component, Input } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';

/**
 * Demonstrates usage of an Image content field within JSS.
 * Image field data is uploaded into the Sitecore Media Library.
 */
@Component({
  selector: 'app-styleguide-field-usage-image',
  templateUrl: './styleguide-field-usage-image.component.html',
})
export class StyleguideFieldUsageImageComponent {
  @Input() rendering: ComponentRendering;

  // sample: rescale image to max 100x50 dimensions, respecting aspect ratio
  // IMPORTANT: size params must be whitelisted for resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
  scaledImageParams = {
    mw: 100,
    mh: 50,
  };

  // sample: create a srcset using two sizes (server resizing), 300 and 100px max widths, respecting aspect ratio
  // IMPORTANT: size params must be whitelisted for resizing to occur. See /sitecore/config/*.config (search for 'allowedMediaParams')
  srcSetImageAttributes = {
    srcSet: [
      { mw: 300 },
      { mw: 100 }
    ]
  };
}
