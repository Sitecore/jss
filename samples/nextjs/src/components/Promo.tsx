import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

interface ComponentProps {
  rendering: ComponentRendering & { params: RenderingVariantParameters };
  params: RenderingVariantParameters;
  fields: Fields;
}

const Promo = (props: ComponentProps): JSX.Element => {
  return (
    <RenderingVariants
      fields={props.fields}
      componentName={props.rendering.componentName}
      params={props.rendering.params}
    />
  );
};

export const Default = (props: RenderingVariantProps<Fields>): JSX.Element => {
  if (props.fields) {
    return (    
      <div className={`component promo ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">        
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="image-caption" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component promo ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Promo</span>
        </div>
      </div>
    )
  }
};

export const WithText = (props: RenderingVariantProps<Fields>): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="promo-text" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promotext">
                <Text className="promo-text" field={props.fields.PromoText2} />
              </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component promo ${props.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Promo</span>
        </div>
      </div>
    )
  }
};

export default Promo;
