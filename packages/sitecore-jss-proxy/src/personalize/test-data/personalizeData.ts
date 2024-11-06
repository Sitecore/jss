export const mountainBikeVariant = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
  fields: {
    content: {
      value:
        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
    },
    heading: { value: 'Mountain Bike' },
  },
};

export const cityBikeVariant = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
  fields: {
    content: {
      value:
        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
    },
    heading: { value: 'Mountain Bike' },
  },
};

export const component_variant = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
  fields: {
    content: {
      value:
        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Hybrid-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
    },
    heading: { value: 'Hybrid Bike' },
  },
}

const defaultRendering = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content' } },
  experiences: {
    'mountain-bike-audience': mountainBikeVariant,
    'city-bike-audience': cityBikeVariant,
    'componentid_variant-id': component_variant,
  },
};

export const getPersonalizeLayoutData = (variant: string, language?: string, path?: string) => {
  const baseLayout = {
    sitecore: {
      context: {
        pageEditing: false,
        site: { name: 'JssNextWeb' },
        visitorIdentificationTimestamp: 1038543,
        language: language || 'en',
        variantId: '',
        itemPath: path || '/styleguide',
      },
      route: {
        name: 'styleguide',
        placeholders: {
          main: {},
        },
      },
    },
  };
  switch (variant) {
    case 'mountain-bike-audience':
      baseLayout.sitecore.route.placeholders.main = [mountainBikeVariant];
      baseLayout.sitecore.context.variantId = 'mountain-bike-audience';
      break;
    case 'city-bike-audience':
      baseLayout.sitecore.route.placeholders.main = [cityBikeVariant];
      baseLayout.sitecore.context.variantId = 'city-bike-audience';
      break;
    case 'componentid_variant-id':
      baseLayout.sitecore.route.placeholders.main = [component_variant];
      baseLayout.sitecore.context.variantId = '_default';
      break;
    default:
      baseLayout.sitecore.route.placeholders.main = [defaultRendering];
      break;
  }
  return baseLayout;
};
