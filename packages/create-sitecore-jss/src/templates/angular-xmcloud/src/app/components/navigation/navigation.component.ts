import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SxaComponent } from '../sxa.component';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
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

  constructor(private jssContext: JssContextService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.isEditing = newState.sitecore && newState.sitecore.context.pageEditing;
    });
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
