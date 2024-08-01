import { Component, OnInit } from '@angular/core';
import { SxaComponent } from '../sxa.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent extends SxaComponent implements OnInit {
  placeholderName: string;
  wrapped: boolean;

  override ngOnInit() {
    super.ngOnInit();

    this.placeholderName = `container-${this.rendering.params?.DynamicPlaceholderId}`;
    this.wrapped = this.rendering.params?.Styles?.split(' ').includes('container');
  }

  get backgroundStyle() {
    const backgroundImage = this.rendering.params?.BackgroundImage;
    const mediaUrlPattern = new RegExp(/mediaurl=\"([^"]*)\"/, 'i');
    if (!backgroundImage || !backgroundImage.match(mediaUrlPattern)) {
      return {};
    }
    const mediaUrl = backgroundImage.match(mediaUrlPattern)[1];
    return {
      backgroundImage: `url('${mediaUrl}')`,
    };
  }
}
