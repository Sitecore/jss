import { Component, OnInit } from '@angular/core';
import { SxaComponent } from '../sxa.component';
import { Field, LinkField, DatasourceField } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
})
export class LinkListComponent extends SxaComponent implements OnInit {
  source: DatasourceField;
  title?: Field<string>;
  fieldLinks: LinkField[];
  field: Field;

  getFieldLinkClass(index: number): string {
    let className = `item${index}`;
    className += (index + 1) % 2 == 0 ? ' even' : ' odd';
    if (index === 0) {
      className += ' first';
    }
    if (index + 1 === this.fieldLinks.length) {
      className += ' last';
    }
    return className;
  }

  ngOnInit() {
    super.ngOnInit();
    const source = this.rendering.fields?.data as unknown;
    const datasource = (source as DatasourceField).datasource;
    this.title = datasource.field?.title as Field<string>;
    this.fieldLinks = [];
    datasource.children.results.forEach(item => {
      if (item.field?.link)
        this.fieldLinks.push(item.field.link as LinkField);
    });
    console.log(this.fieldLinks);
  }
}
