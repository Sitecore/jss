import { Component, OnInit } from '@angular/core';
import { SxaComponent } from '../sxa.component';
import { Field, LinkField, SxaLinkListFields } from '@sitecore-jss/sitecore-jss-angular';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  host: {
    'class': 'component link-list',
    '[class]': 'styles',
    '[attr.id]': 'id',
  }
})
export class LinkListComponent extends SxaComponent<SxaLinkListFields> implements OnInit {
  title?: Field<string>;
  fieldLinks: LinkField[] = [];

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
    const datasource = this.rendering.fields?.data?.datasource;
    if (datasource) {
      this.title = datasource.field?.title as Field<string>;
      datasource.children.results.forEach(item => {
        if (item.field?.link)
          this.fieldLinks.push(item.field.link as LinkField);
      });
    }
  }
}
