import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a Content Link content field within JSS.
 * Content links are a reference to a single other piece of content.
 */
const StyleguideFieldUsageItemLink = (props) => {
  const { sharedItemLink, localItemLink } = props.fields;

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-itemlink">
      <h5>Shared Item Link</h5>
      {/*
        Item link fields are returned with their value as the referenced item value.
      */}
      {sharedItemLink && (
        <div>
          {/* The referenced item's fields can be rendered and edited using normal helper components: */}
          <p>
            Field: <Text field={sharedItemLink.fields.textField} />
          </p>
        </div>
      )}

      <h5>Local Item Link</h5>
      {localItemLink && (
        <div>
          <p>
            Field: <Text field={localItemLink.fields.textField} />
          </p>
        </div>
      )}
    </StyleguideSpecimen>
  );
};

export default StyleguideFieldUsageItemLink;
