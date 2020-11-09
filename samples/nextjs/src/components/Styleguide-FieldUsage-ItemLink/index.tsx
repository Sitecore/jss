import { ComponentRendering, Field, Text, Item } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from '../Styleguide-Specimen';

interface StyleguideFieldUsageItemLinkProps {
  fields: {
    heading: Field<string>;
    description: Field<string>;
    sharedItemLink: Item;
    localItemLink: Item;
  },
  rendering: ComponentRendering;
}

/**
 * Demonstrates usage of a Content Link content field within JSS.
 * Content links are a reference to a single other piece of content.
 */
const StyleguideFieldUsageItemLink: React.FC<StyleguideFieldUsageItemLinkProps> = (props) => {
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
            Field: <Text field={sharedItemLink.fields.textField as Field<string>} />
          </p>
        </div>
      )}

      <h5>Local Item Link</h5>
      {localItemLink && (
        <div>
          <p>
            Field: <Text field={localItemLink.fields.textField as Field<string>} />
          </p>
        </div>
      )}
    </StyleguideSpecimen>
  );
};

export default StyleguideFieldUsageItemLink;
