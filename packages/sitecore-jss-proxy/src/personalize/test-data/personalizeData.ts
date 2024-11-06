export const mountain_bike_audience = {
  main: [
    {
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
    },
  ],
};

export const city_bike_audience = {
  main: [
    {
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
    },
  ],
};

const default_audience = {
  main: [
    {
      uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
      componentName: 'ContentBlock',
      dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
      fields: { content: { value: '' }, heading: { value: 'Default Content' } },
      experiences: {
        mountain_bike_audience: mountain_bike_audience,
        city_bike_audience: city_bike_audience,
      },
    },
  ],
};

export const getPersonalizeLayoutData = (variant: string, language?: string, path?: string) => {
  const baseLayout = {
    sitecore: {
      context: {
        pageEditing: false,
        site: { name: 'JssNextWeb' },
        visitorIdentificationTimestamp: 1038543,
        language: language || 'en',
        variantId: undefined,
        itemPath: path || '/styleguide',
      },
      route: {
        name: 'styleguide',
        placeholders: {},
      },
    },
  };
  switch (variant) {
    case 'mountain_bike':
      baseLayout.sitecore.route.placeholders = mountain_bike_audience;
      break;
    case 'city_bike':
      baseLayout.sitecore.route.placeholders = city_bike_audience;
      break;
    default:
      baseLayout.sitecore.route.placeholders = default_audience;
      break;
  }
  return baseLayout;
};
