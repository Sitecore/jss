const mountain_bike_audience = {
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

const city_bike_audience = {
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

export const layoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: { name: 'JssNextWeb' },
      visitorIdentificationTimestamp: 1038543,
      language: 'en',
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

export const segmentIsNull = {
  uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
  componentName: undefined,
  dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
  fields: { content: { value: '' }, heading: { value: 'Default Content' } },
  experiences: {
    mountain_bike_audience: {},
  },
};
