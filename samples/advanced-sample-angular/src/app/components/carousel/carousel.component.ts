import { Component, Input, ViewEncapsulation} from '@angular/core';
import { JssService } from '../../jss.service';

@Component({
  /* tslint:disable-next-line */
  selector: 'div [app-carousel]',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  @Input() rendering: any;

  pageEditing: boolean;
  index = 0;
  imageParams = {
    as: 1,
  };
  imageAttrs = {
    srcSet: [
      {h: 350, w: 650},
      {h: 269, w: 500},
      {h: 195, w: 363}
    ],
  };

  constructor(
    private jssService: JssService,
  ) {
    this.jssService.state.subscribe(jssState => {
      this.pageEditing = jssState.sitecore.context.pageEditing;
    });
  }
}
