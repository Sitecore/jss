import { expect } from 'chai';
import * as personalize from './layout-personalizer';
import { ComponentRenderingWithExpiriences } from './layout-personalizer';
// import { spy } from 'sinon';

const { personalizeLayout, personalizePlaceholder, personalizeComponent } = personalize;

const layout = {
  sitecore: {
    context: {
      pageEditing: false,
      site: { name: 'JssNextWeb'},
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
              mountain_bike_audirnce: {
                uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                componentName: 'ContentBlock',
                dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
                fields: {
                  content: {
                    value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
                  },
                  heading: { value: 'Mountain Bike' }
                }
              },
              city_bike_audience: {
                uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
                componentName: 'ContentBlock',
                dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
                fields: {
                  content: {
                    value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
                  },
                  heading: { value: 'Mountain Bike' }
                }
              }
            }
          }
        ]
      }
    }
  }
}

const componentWithExperiences = {
    uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
    componentName: 'ContentBlock',
    dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
    fields: { content: {
      value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
    },
    heading: { value: 'Mountain Bike' } }
  }

const componentArrWithExperiences = [
  {
    uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
    componentName: 'ContentBlock',
    dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
    fields: { content: {
      value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
    },
    heading: { value: 'Mountain Bike' } }
  }
]

const componentArr = [
  {
    uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
    componentName: 'ContentBlock',
    dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
    fields: { content: { value: '' }, heading: { value: 'Default Content' } },
    experiences: {
      mountain_bike_audirnce: {
        uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
        componentName: 'ContentBlock',
        dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
        fields: { content: {
          value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
        },
        heading: { value: 'Mountain Bike' } }
      },
      city_bike_audience: {
        uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
        componentName: 'ContentBlock',
        dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
        fields: { content: {
          value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
        },
        heading: { value: 'City Bike' } }
      }
    }
  }
]

const component = {
    uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
    componentName: 'ContentBlock',
    dataSource: 'e020fb58-1be8-4537-aab8-67916452ecf2',
    fields: { content: { value: '' }, heading: { value: 'Default Content' } },
    experiences: {
      mountain_bike_audirnce: {
        uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
        componentName: 'ContentBlock',
        dataSource: '20679cd4-356b-4452-b507-453beeb0be39',
        fields: { content: {
          value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
        },
        heading: { value: 'Mountain Bike' } }
      },
      city_bike_audience: {
        uid: '0b6d23d8-c50e-4e79-9eca-317ec43e82b0',
        componentName: 'ContentBlock',
        dataSource: '36e02581-2056-4c55-a4d5-f4b700ba1ae2',
        fields: { content: {
          value: '<p><img src="https://edge-beta.sitecorecloud.io/ser-edge-personalization/media/JssNextWeb/Mountain-Bike.jpg?h=675&amp;w=1200" style="width:1200px;height:675px;" /></p>'
        },
        heading: { value: 'City Bike' } }
      }
    }
  }



describe('layout-personalizer', () => {

  describe('personalizeLayout', () => {
    it('should not return anything', () => {
      const segment = 'default';
      const personalizedLayoutResult = personalizeLayout(layout, segment);
      expect(personalizedLayoutResult).to.equal(undefined);
    });
  });

  describe('When segment is default', () => {
    describe('personalizePlaceholder', () => {
      const segment = 'default';
      const personalizedPlaceholderResult = personalizePlaceholder(componentArr, segment);
      it('should return array of personalized components when segment is default', () => {
        expect(personalizedPlaceholderResult).to.deep.equal(componentArr);
      });
    });

    describe('personalizeComponent', () => {
      const segment = 'default';
      const personalizedComponentResult = personalizeComponent((component as unknown) as ComponentRenderingWithExpiriences, segment);
      it('should return personalized component', () => {
        expect(personalizedComponentResult).to.deep.equal(component);
      });
    })
  })

  describe('When segment is not default', () => {
    describe('personalizePlaceholder', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedPlaceholderResult = personalizePlaceholder(componentArr, segment);
      it('should return array of personalized components when segment is not default', () => {
        expect(personalizedPlaceholderResult).to.deep.equal(componentArrWithExperiences);
      });
    });

    describe('personalizeComponent', () => {
      const segment = 'mountain_bike_audirnce';
      const personalizedComponentResult = personalizeComponent((component as unknown) as ComponentRenderingWithExpiriences, segment);
      it('should return personalized component when segment is not default', () => {
        expect(personalizedComponentResult).to.deep.equal(componentWithExperiences);
      });
    })
  })
});
