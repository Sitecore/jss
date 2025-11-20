import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRendering, JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { StyleguideSpecimenComponent } from '../shared/styleguide-specimen/styleguide-specimen.component';

/**
 * Demonstrates usage of a Content List field type within JSS.
 * Content Lists are references to 0..n other content items.
 * In Sitecore terms, this maps by default to a Treelist field.
 */
@Component({
  selector: 'app-styleguide-field-usage-content-list',
  templateUrl: './styleguide-field-usage-content-list.component.html',
  imports: [CommonModule, JssModule, StyleguideSpecimenComponent]
})
export class StyleguideFieldUsageContentListComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  sharedContentListKeys: string[] = [];
  localContentListKeys: string[] = [];

  ngOnInit() {
    const sharedList = this.rendering?.fields?.sharedContentList;
    if (sharedList && Array.isArray(sharedList)) {
      this.sharedContentListKeys = sharedList.map((_, index) => index.toString());
    }
    
    const localList = this.rendering?.fields?.localContentList;
    if (localList && Array.isArray(localList)) {
      this.localContentListKeys = localList.map((_, index) => index.toString());
    }
  }
}
