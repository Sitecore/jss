/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteData, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';
import { useEffect } from 'react';

declare const _boxeverq: any;
declare const Boxever: any;

function createPageView(locale: string | undefined, routeName: string) {
  // POS must be valid in order to save events (domain name might be taken but it must be defined in CDP settings)
  const pos = process.env.CDP_POS || window.location.host.replace(/^www\./,'');

  _boxeverq.push(function () {
    const pageViewEvent = {
      browser_id: Boxever.getID(),
      channel: 'WEB',
      type: 'VIEW',
      language: locale,
      page: routeName,
      pos: pos,
    };

    Boxever.eventCreate(pageViewEvent, function () {}, 'json');
  });
}

const CdpIntegrationScript = (): JSX.Element => {

  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext.pageEditing;
  useEffect(() => {
    // Do not create events in editing mode
    if (isEditing) {
      return;
    }

    createPageView(sitecoreContext.route.itemLanguage, sitecoreContext.route.name);
  }, []);

  // Boxever is not needed during page editing
  if (isEditing) {
    return null as any;
  }

  return (
    <>
      <Script
        id="cdp_settings"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              var _boxeverq = _boxeverq || [];

              var _boxever_settings = {
                  client_key: '${process.env.BOXEVER_CLIENT_KEY}',
                  target: '${process.env.BOXEVER_TARGET_URL}',
                  cookie_domain: ''
              };
            `,
        }}
      />
      <Script src={process.env.BOXEVER_SCRIPT_URL} />
    </>
  );
};

export default CdpIntegrationScript;
