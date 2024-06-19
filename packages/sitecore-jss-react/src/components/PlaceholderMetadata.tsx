import React, { ReactNode } from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';
import { getDynamicPlaceholderPattern, isDynamicPlaceholder } from './PlaceholderCommon';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  rendering: ComponentRendering;
  placeholderName?: string;
  children?: ReactNode;
}

export type CodeBlockAttributes = {
  type: string;
  chrometype: string;
  className: string;
  kind: string;
  id?: string;
};

/**
 * default value of uid for root placeholder when uid is not present.
 */
const DEFAULT_PLACEHOLDER_UID = '00000000-0000-0000-0000-000000000000';

/**
 * A React component to generate metadata blocks for a placeholder or rendering.
 * It utilizes dynamic attributes based on whether the component acts as a placeholder
 * or as a rendering to properly render the surrounding code blocks.
 *
 * @param {object} props The properties passed to the component.
 * @param {ComponentRendering} props.rendering The rendering data.
 * @param {string} [props.placeholderName] The name of the placeholder.
 * @param {JSX.Element} props.children The child components or elements to be wrapped by the metadata code blocks.
 * @returns {JSX.Element} A React fragment containing open and close code blocks surrounding the children elements.
 */
export const PlaceholderMetadata = ({
  rendering,
  placeholderName,
  children,
}: PlaceholderMetadataProps): JSX.Element => {
  const getCodeBlockAttributes = (
    kind: string,
    id: string,
    placeholderName?: string
  ): CodeBlockAttributes => {
    const chrometype = placeholderName ? 'placeholder' : 'rendering';

    const attributes: CodeBlockAttributes = {
      type: 'text/sitecore',
      chrometype: chrometype,
      className: 'scpm',
      kind: kind,
    };

    if (kind === 'open') {
      if (chrometype === 'placeholder' && placeholderName) {
        let phId = '';

        for (const placeholder of Object.keys(rendering.placeholders)) {
          if (placeholderName === placeholder) {
            phId = id
              ? `${placeholderName}_${id}`
              : `${placeholderName}_${DEFAULT_PLACEHOLDER_UID}`;
            break;
          }

          // Check if the placeholder is a dynamic placeholder
          if (isDynamicPlaceholder(placeholder)) {
            const pattern = getDynamicPlaceholderPattern(placeholder);

            // Check if the placeholder matches the dynamic placeholder pattern
            if (pattern.test(placeholderName)) {
              phId = placeholder;
              break;
            }
          }
        }

        attributes.id = phId;
      } else {
        attributes.id = id;
      }
    }

    return attributes;
  };

  const renderComponent = (uid: string, placeholderName?: string) => (
    <>
      <code {...getCodeBlockAttributes('open', uid, placeholderName)} />
      {children}
      <code {...getCodeBlockAttributes('close', uid, placeholderName)} />
    </>
  );

  return <>{renderComponent(rendering.uid, placeholderName)}</>;
};
