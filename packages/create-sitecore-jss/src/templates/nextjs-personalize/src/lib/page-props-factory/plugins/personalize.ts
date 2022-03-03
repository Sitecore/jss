import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { personalizeLayout } from './../../layout-personalizer';
import { SitecorePageProps } from 'lib/page-props';

class PersonalizePlugin implements Plugin {
  order = 2;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {

    // Get segment for personalization (from path)
    let filtered = null;
    if (context !== null) {
      // temporary disable null assertion
      if (Array.isArray(context!.params!.path)) {
        filtered = context!.params!.path.filter((e) => e.includes('_segmentId_'));
      }
    }

    const segment =
      filtered === null || filtered.length == 0
        ? '_default'
        : filtered[0].replace('_segmentId_', '');

    // modify layoutData to use specific segment instead of default
    personalizeLayout(props.layoutData, segment);

    return props;
  }
}

export const personalizePlugin = new PersonalizePlugin();
