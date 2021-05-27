import { SitecorePagePropsFactory } from './page-props-factory';
import { LayoutServiceFactory } from './layout-service-factory';
import {
  ComponentPropsService,
  DictionaryPhrases,
  LayoutService,
  LayoutServiceData,
  LayoutPersonalizationUtils,
  EditingDataService,
  DictionaryService,
  PlaceholdersData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { DictionaryServiceFactory } from './dictionary-service-factory';
import { expect, use } from 'chai';
import { StubbedInstance, stubConstructor, stubInterface } from 'ts-sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

describe('SitecorePagePropsFactory', () => {
  let factory: SitecorePagePropsFactory;

  let layoutPersonalizationUtils: StubbedInstance<LayoutPersonalizationUtils>;

  const placeholders: PlaceholdersData<string> = {};
  const context = {
    preview: false,
  };
  let layoutServiceData: LayoutServiceData;

  beforeEach(() => {
    context.preview = false;
    layoutServiceData = {
      sitecore: {
        context: {},
        route: {
          name: 'name',
          placeholders: placeholders,
        },
      },
    };

    const layoutService = stubInterface<LayoutService>();
    layoutService.fetchLayoutData.returns(Promise.resolve(layoutServiceData));
    const layoutServiceFactory = stubInterface<LayoutServiceFactory>();
    layoutServiceFactory.create.returns(layoutService);

    const editingDataService = stubInterface<EditingDataService>();
    editingDataService.getEditingData.returns(
      Promise.resolve({
        path: '',
        language: '',
        layoutData: layoutServiceData,
        dictionary: {},
      })
    );

    const dictionaryPhrases = stubInterface<DictionaryPhrases>();
    const dictionaryService = stubInterface<DictionaryService>();
    dictionaryService.fetchDictionaryData.returns(Promise.resolve(dictionaryPhrases));
    const dictionaryServiceFactory = stubInterface<DictionaryServiceFactory>();
    dictionaryServiceFactory.create.returns(dictionaryService);

    const componentPropsService = stubConstructor(ComponentPropsService);
    componentPropsService.fetchServerSideComponentProps.returns(Promise.resolve({}));
    componentPropsService.fetchStaticComponentProps.returns(Promise.resolve({}));

    layoutPersonalizationUtils = stubConstructor(LayoutPersonalizationUtils);

    factory = new SitecorePagePropsFactory(
      componentPropsService,
      dictionaryServiceFactory,
      layoutPersonalizationUtils,
      layoutServiceFactory,
      editingDataService
    );
  });

  describe('create', () => {
    it('should return not null page props', async () => {
      const sitecorePageProps = await factory.create(context);

      expect(sitecorePageProps).not.to.be.null;
    });

    it('should return page props with preview equal to false if context preview is false', async () => {
      context.preview = false;

      const sitecorePageProps = await factory.create(context);

      expect(sitecorePageProps).not.to.be.null;
      expect(sitecorePageProps.isPreview).to.be.false;
    });

    it('should return page props with preview equal to true if context preview is true', async () => {
      context.preview = true;

      const sitecorePageProps = await factory.create(context);

      expect(sitecorePageProps).not.to.be.null;
      expect(sitecorePageProps.isPreview).to.be.true;
    });

    it('should return page props with notFound equal to false if there is context route', async () => {
      const sitecorePageProps = await factory.create(context);

      expect(sitecorePageProps.notFound).to.be.false;
    });

    it('should return page props with notFound equal to true if there is no context route', async () => {
      layoutServiceData.sitecore.route = null;

      const sitecorePageProps = await factory.create(context);

      expect(sitecorePageProps.notFound).to.be.true;
    });

    it('should replace personalized components with loader components', async () => {
      await factory.create(context);

      expect(
        layoutPersonalizationUtils.replacePersonalizedComponentsWithLoaderComponents
      ).to.have.been.calledWith(
        layoutServiceData.sitecore.route?.placeholders,
        'PersonalizationLoadingComponent'
      );
    });
  });
});
