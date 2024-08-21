import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LinkField } from '@sitecore-jss/sitecore-jss-angular';
import { Field } from '@sitecore-jss/sitecore-jss-angular';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: Field<string>;
  NavigationTitle: Field<string>;
  Href: string;
  Querystring: string;
  Children: Array<NavItemFields>;
  Styles: string[];
}

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
})
export class NavigationItemComponent implements OnInit {
  @Input() navItemFields: NavItemFields;
  @Input() relativeLevel: number;
  @Output() childLinkClickEvent: EventEmitter<Event> = new EventEmitter<Event>();
  cssClasses = '';
  isActive = false;
  linkField = {};
  childrenRelativeLevel = 0;
  hasChildren = false;

  constructor() {}

  ngOnInit() {
    this.cssClasses = `${this.navItemFields.Styles.concat('rel-level' + this.relativeLevel).join(
      ' '
    )}`;
    this.linkField = this.getLinkField(this.navItemFields);
    this.hasChildren = this.navItemFields.Children && this.navItemFields.Children.length != 0;
    this.childrenRelativeLevel = this.relativeLevel + 1;
  }

  onClick(event: Event) {
    this.childLinkClickEvent.emit(event);
  }

  private getLinkField = (navItemFields: NavItemFields): LinkField => ({
    value: {
      href: navItemFields.Href,
      title: this.getLinkTitle(navItemFields),
      querystring: navItemFields.Querystring,
    },
  });

  private getLinkTitle = (navItemFields: NavItemFields): string | undefined => {
    let title;
    if (navItemFields.NavigationTitle?.value) {
      title = navItemFields.NavigationTitle.value.toString();
    } else if (navItemFields.Title?.value) {
      title = navItemFields.Title.value.toString();
    } else {
      title = navItemFields.DisplayName;
    }

    return title;
  };
}
