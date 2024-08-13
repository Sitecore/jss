import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditMode } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent extends SxaComponent implements OnInit, OnDestroy {
  isEditing = false;
  classHeroBannerEmpty = '';
  backgroundStyle = {};
  modifyImageProps = {};
  private contextSubscription: Subscription;

  constructor(private jssContext: JssContextService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    const imageField = this.rendering.fields?.Image;

    this.backgroundStyle = imageField?.value?.src && {
      'background-image': `url('${imageField.value.src}');`,
    };

    this.contextSubscription = this.jssContext.state.subscribe((newState) => {
      this.isEditing = newState.sitecore && newState.sitecore.context.pageEditing;

      this.classHeroBannerEmpty =
        this.isEditing && imageField?.value?.class === 'scEmptyImage' ? 'hero-banner-empty' : '';

      const isMetadataMode = newState.sitecore?.context?.editMode === EditMode.Metadata;
      this.modifyImageProps = !isMetadataMode
        ? {
            ...imageField,
            editable: imageField?.editable
              ?.replace(`width="${imageField?.value?.width}"`, 'width="100%"')
              .replace(`height="${imageField?.value?.height}"`, 'height="100%"'),
          }
        : {
            ...imageField,
            value: {
              ...imageField?.value,
              style: { width: '100%', height: '100%' },
            },
          };
    });
  }

  ngOnDestroy() {
    if (this.contextSubscription) {
      this.contextSubscription.unsubscribe();
    }
  }
}
