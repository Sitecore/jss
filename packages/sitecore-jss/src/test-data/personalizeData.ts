export const mountain_bike_audience = {
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

export const city_bike_audience = {
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

export const snow_bike_audience = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
  fields: {
    content: {
      value:
        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Snow-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
    },
    heading: { value: 'Snow Bike' },
  },
};

export const sand_bike_audience = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
  fields: {
    content: {
      value:
        '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Sand-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>',
    },
    heading: { value: 'Sand Bike' },
  },
};

export const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: { name: 'JssNextWeb' },
      visitorIdentificationTimestamp: 1038543,
      language: 'en',
      variantId: undefined,
    },
    route: {
      name: 'landingpage',
      placeholders: {
        'jss-main': [
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
      },
    },
  },
};

export const layoutDataWithoutPlaceholder = {
  sitecore: {
    context: {
      pageEditing: false,
      site: { name: 'JssNextWeb' },
      visitorIdentificationTimestamp: 1038543,
      language: 'en',
    },
    route: {
      name: 'landingpage',
      placeholders: {},
    },
  },
};

export const componentWithExperiences = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
  fields: mountain_bike_audience.fields,
};

export const componentsWithExperiencesArray = [componentWithExperiences];

export const component = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock',
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content' } },
  experiences: {
    mountain_bike_audience: mountain_bike_audience,
    city_bike_audience: city_bike_audience,
  },
};

export const component2 = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: 'ContentBlock 2',
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content 2' } },
  experiences: {
    mountain_bike_audience: { ...mountain_bike_audience, componentName: 'ContentBlock 2' },
    city_bike_audience: { ...city_bike_audience, componentName: 'ContentBlock 2' },
  },
};

export const component3 = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82c1',
  componentName: 'ContentBlock 3',
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecg3',
  fields: { content: { value: '' }, heading: { value: 'Default Content 3' } },
  experiences: {
    snow_bike_audience: { ...snow_bike_audience, componentName: 'ContentBlock 3' },
    city_bike_audience: { ...city_bike_audience, componentName: 'ContentBlock 3' },
  },
};

export const component4 = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82c1',
  componentName: 'ContentBlock 4',
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecg3',
  fields: { content: { value: '' }, heading: { value: 'Default Content 4' } },
  experiences: {
    city_bike_audience: { ...mountain_bike_audience, componentName: 'ContentBlock 4' },
    sand_bike_audience: { ...sand_bike_audience, componentName: 'ContentBlock 4' },
  },
};

export const componentsArray = [component];

export const withoutComponentName = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: undefined,
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content' } },
  experiences: {
    mountain_bike_audience: mountain_bike_audience,
    city_bike_audience: city_bike_audience,
  },
};

export const variantIsHidden = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: undefined,
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content' } },
  experiences: {
    mountain_bike_audience: {
      componentName: null,
      dataSource: null,
      uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b1',
    },
  },
};
