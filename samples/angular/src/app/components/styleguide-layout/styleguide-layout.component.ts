import { Component, OnInit, Input } from '@angular/core';
import { ComponentRendering, getFieldValue } from '@sitecore-jss/sitecore-jss-angular';
import { getChildPlaceholder } from '@sitecore-jss/sitecore-jss-angular';

interface StyleguideNavigationData {
  heading: string;
  id: string;
  children: {
      heading: string;
      id: string;
  }[];
}

/**
 * The main layout (columns) of the styleguide.
 * Navigation is automatically generated based on the components added to the layout,
 * and does not need to be manually maintained.
 */
@Component({
  selector: 'app-styleguide-layout',
  templateUrl: './styleguide-layout.component.html',
})
export class StyleguideLayoutComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  navigation: StyleguideNavigationData[];

  constructor() { }

  ngOnInit() {
    // this code reads the components in the child placeholders of this component,
    // and projects them into the left navigation column for the styleguide
    this.navigation = getChildPlaceholder(this.rendering, 'JssAngularWeb-jss-styleguide-layout')
      .filter((section: ComponentRendering) => getFieldValue(section, 'heading'))
      .map((section: ComponentRendering) => ({
        heading: getFieldValue(section, 'heading') as string,
        id: `i${section.uid.replace(/[{}]/g, '')}`,
        children: getChildPlaceholder(section, 'JssAngularWeb-jss-styleguide-section')
          .filter((component: ComponentRendering) => getFieldValue(component, 'heading'))
          .map((component: ComponentRendering) => ({
            heading: getFieldValue(component, 'heading') as string,
            id: `i${component.uid.replace(/[{}]/g, '')}`,
          })),
      }));
  }
}
