import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JssModule } from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { EditMode, ImageField } from '@sitecore-jss/sitecore-jss-angular';
import { SxaComponent } from '../sxa.component';
import { JssContextService } from '../../jss-context.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  imports: [CommonModule, JssModule],
})
export class ImageComponent extends SxaComponent implements OnInit, OnDestroy {
  @ViewChild('default', { static: true }) defaultVariant: TemplateRef<unknown>;
  @ViewChild('banner', { static: true }) bannerVariant: TemplateRef<unknown>;
  classHeroBannerEmpty = '';
  backgroundStyle = {};
  modifyImageProps = {};
  isEditing = false;
  private contextSubscription: Subscription;
  private jssContext = inject(JssContextService);

  ngOnInit() {
    super.ngOnInit();

    const imageField = this.rendering.fields?.Image as ImageField;
    this.backgroundStyle = imageField?.value?.src && {
      'background-image': `url('${imageField.value.src}')`,
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

  public get variant(): TemplateRef<unknown> {
    return this.rendering.params?.FieldNames === 'Banner'
      ? this.bannerVariant
      : this.defaultVariant;
  }
}
