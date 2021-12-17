import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a Content List field type within JSS.
 * Content Lists are references to 0..n other content items.
 * In Sitecore terms, this maps by default to a Treelist field.
 */
const StyleguideFieldUsageContentList = (props) => {
  const { sharedContentList, localContentList } = props.fields;

  return (
    <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-content-list">
      <h5>Shared Content List</h5>
      {/*
      Content list fields are returned with their value as an array of the referenced items.
      So we can use the .map() array function to traverse them. Ensure a `key` attribute is set
      on each element to make React's DOM updating happy:
     */}
      {sharedContentList &&
        sharedContentList.map((listItem, index) => (
          <div key={`sharedListItem-${index}`}>
            {/* The referenced item's fields can be rendered and edited using normal helper components: */}
            <p>
              Field: <Text field={listItem.fields.textField} />
            </p>
          </div>
        ))}

      <h5>Local Content List</h5>
      {localContentList &&
        localContentList.map((listItem, index) => (
          <div key={`localListItem-${index}`}>
            {/* The referenced item's fields can be rendered and edited using normal helper components: */}
            <p>
              Field: <Text field={listItem.fields.textField} />
            </p>
          </div>
        ))}
    </StyleguideSpecimen>
  );
};

export default StyleguideFieldUsageContentList;
