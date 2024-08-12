import { Component, OnInit, OnDestroy } from '@angular/core';
import { SxaComponent } from '../sxa.component';
import { JssContextService } from '../../jss-context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent extends SxaComponent implements OnInit, OnDestroy {
  isEditing = false;
  private contextSubscription: Subscription;

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
}
