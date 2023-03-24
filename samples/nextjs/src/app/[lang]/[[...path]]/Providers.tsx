'use client';

import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { I18nProvider } from 'next-localization';
import { componentFactory, editingComponentFactory } from 'temp/componentFactory';
import Layout from 'components/Layout';

export const Providers = (props: SitecorePageProps) => {
  const isEditing = props.layoutData.sitecore.context.pageEditing;

  return (
    <I18nProvider lngDict={props.dictionary} locale={props.locale}>
      <SitecoreContext
        componentFactory={isEditing ? editingComponentFactory : componentFactory}
        layoutData={props.layoutData}
      >
        <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
      </SitecoreContext>
    </I18nProvider>
  );
};
