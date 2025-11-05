import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { SxaComponent } from '../sxa.component';
import { JssContextService } from '../../jss-context.service';
import { NavigationItemComponent } from './navigation-item.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule, JssModule, NavigationItemComponent],
  host: {
    'class': 'component navigation',
    '[id]': 'id',
    '[class]': 'styles + " " + rendering.params?.GridParameters',
  },
})
export class NavigationComponent extends SxaComponent implements OnInit, OnDestroy {
  isEditing = false;
  private contextSubscription: Subscription;
  isOpenMenu = false;
  baseLevel = 1;
  private jssContext = inject(JssContextService);
  fieldKeys: string[];

  ngOnInit() {
    super.ngOnInit();
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.isEditing = newState.sitecore && newState.sitecore.context.pageEditing;
    });
    this.fieldKeys = Object.keys(this.rendering.fields || {});
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }

  toggleMenu(event: Event, flag?: boolean) {
    if (event && this.isEditing) {
      event.preventDefault();
    }

    if (flag !== undefined) {
      this.isOpenMenu = flag;
    }

    this.isOpenMenu = !this.isOpenMenu;
  }
}
