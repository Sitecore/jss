import { Component, OnDestroy, OnInit } from '@angular/core';
import { LinkField, SxaTitleFields, TextField } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  host: {
    'class': 'component title',
    '[class]': 'styles',
    '[id]': 'id',
  }
})
export class TitleComponent extends SxaComponent<SxaTitleFields> implements OnInit, OnDestroy {
  text: TextField;
  link: LinkField;
  pageEditing?: boolean;
  
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const datasource =
      this.rendering.fields?.data?.datasource || this.rendering.fields?.data?.contextItem;
    this.text = datasource.field?.jsonValue;
    this.link = {
      value: {
        href: datasource?.url?.path,
        title: datasource?.field?.jsonValue?.value,
        text: datasource?.field?.jsonValue?.value,
      },
    };
    this.contextSubscription = this.jssContext.state.subscribe(({ sitecore }) => {
      this.pageEditing = sitecore.context.pageEditing;
      if (sitecore.context.pageState !== 'normal') {
        this.link.value.querystring = `sc_site=${datasource?.url?.siteName}`;
        if (!this.text?.value) {
          this.text.value = 'Title field';
          this.link.value.href = '#';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
