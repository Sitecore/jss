import { addComponent, CommonFieldTypes } from '@sitecore-jss/sitecore-jss-manifest';

export default (manifest) => {
  addComponent(manifest, {
    name: 'DownloadCallout',
    // ids (optional): a string (unique app-wide) or GUID that sets the ID when imported into Sitecore
    // the id is generated based on the `name` if it is unspecified.
    // Because a component expands into both a rendering and template item when imported, you have
    // control over two different IDs here should you choose to set IDs explicitly.
    renderingId: 'download-callout-rendering',
    templateId: 'download-callout-template',
    displayName: 'Download Callout',
    fields: [
      {
        name: 'linkText',
        displayName: 'Link Text',
        type: CommonFieldTypes.SingleLineText,
        // id (optional): a string (unique app-wide) or GUID that sets the ID when imported into Sitecore
        // the id is generated based on the `name` if it is unspecified.
        id: 'download-callout-linkText',
      },
    ],
  });

  addComponent(manifest, {
    name: 'Carousel',
    displayName: 'Carousel',
    fields: [
      {
        name: 'items',
        displayName: 'Items',
        type: CommonFieldTypes.ContentList,
      },
    ],
  });

  addComponent(manifest, {
    name: 'Carousel-items-Item',
    displayName: 'Carousel Item',
    fields: [
      { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
      {
        name: 'title',
        displayName: 'Title',
        type: manifest.fieldTypes.singleLineText,
      },
      { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
      { name: 'link', displayName: 'Slide Link', type: CommonFieldTypes.GeneralLink },
    ],
  });

  addComponent(manifest, {
    name: 'FormContent',
    displayName: 'Form Content',
    fields: [
      {
        name: 'title',
        displayName: 'Title',
        type: CommonFieldTypes.SingleLineText,
      },
      { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
      { name: 'image', displayName: 'Image', type: CommonFieldTypes.Image },
    ],
  });

  addComponent(manifest, {
    name: 'Heading',
    displayName: 'Heading',
    fields: [
      {
        name: 'text',
        displayName: 'Text',
        type: CommonFieldTypes.SingleLineText,
      },
    ],
    params: ['size'],
  });

  addComponent(manifest, {
    name: 'Jumbotron',
    displayName: 'Jumbotron',
    fieldEditorFields: ['body'], // explicitly set fields editable in popup editor
    fields: [
      {
        name: 'titleText',
        displayName: 'Title Text',
        type: CommonFieldTypes.SingleLineText,
      },
      { name: 'body', displayName: 'Body', type: CommonFieldTypes.RichText },
    ],
    params: ['titleSize', 'shade'],
  });

  addComponent(manifest, {
    name: 'RichText',
    displayName: 'Rich Text',
    displayFieldEditorButton: false, // disable popup editing button
    fields: [{ name: 'text', displayName: 'Text', type: CommonFieldTypes.RichText }],
  });

  addComponent(manifest, {
    name: 'LinkButton',
    displayName: 'Link Button',
    fields: [
      {
        name: 'link',
        displayName: 'Link',
        type: CommonFieldTypes.GeneralLink,
      },
    ],
  });

  addComponent(manifest, {
    name: 'FileLink',
    displayName: 'File Link',
    fields: [{ name: 'file', displayName: 'File', type: CommonFieldTypes.File }],
  });

  addComponent(manifest, {
    name: 'Tab',
    displayName: 'Tab',
    fields: [
      {
        name: 'title',
        displayName: 'Title',
        type: CommonFieldTypes.SingleLineText,
      },
    ],
    placeholders: [{ name: 'tab' }],
  });

  addComponent(manifest, {
    name: 'Tabs',
    displayName: 'Tabs',
    placeholders: [{ name: 'tabs' }],
  });

  addComponent(manifest, {
    name: 'TwoColumn',
    displayName: 'Two Column',
    placeholders: [{ name: 'col1' }, { name: 'col2' }],
  });
};
