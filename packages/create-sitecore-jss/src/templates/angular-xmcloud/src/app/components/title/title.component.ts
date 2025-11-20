import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { LinkField, SxaTitleFields, TextField } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';
import { Subscription } from 'rxjs';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  imports: [CommonModule, JssModule],
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
  private jssContext = inject(JssContextService);

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
