/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteData } from '@sitecore-jss/sitecore-jss/layout';
import Script from 'next/script';
import { useEffect } from 'react';

declare const _boxeverq: any;
declare const Boxever: any;

function createPageView(locale: string | undefined, routeName: string) {
  // POS must be valid in order to save events (domain name might be taken but it must be defined in CDP settings)
  const pos = 'spintel.com';

  _boxeverq.push(function () {
    const pageViewEvent = {
      browser_id: Boxever.getID(),
      channel: 'WEB',
      type: 'VIEW',
      language: locale,
      page: routeName,
      pos: pos,
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Boxever.eventCreate(pageViewEvent, function () {}, 'json');
  });
}

interface CdpIntegrationProps {
  pageEditing: boolean | undefined;
  route: RouteData;
}

const CdpIntegrationScript = ({
  route: { itemLanguage, name },
  pageEditing,
}: CdpIntegrationProps): JSX.Element => {
  const clientKey = process.env.BOXEVER_CLIENT_KEY
  const targetUrl = process.env.BOXEVER_TARGET_URL

  useEffect(() => {
    // Do not create events in editing mode
    if (pageEditing) {
      return;
    }

    createPageView(itemLanguage, name);
  }, []);

  // Boxever is not needed during page editing
  if (pageEditing) {
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
                  client_key: '${clientKey}',
                  target: '${targetUrl}',
                  cookie_domain: ''
              };
            `,
        }}
      />
      <Script src="https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.8.min.js" />
    </>
  );
};

export default CdpIntegrationScript;
