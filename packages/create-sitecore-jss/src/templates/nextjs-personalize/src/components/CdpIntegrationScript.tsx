import { useSitecoreContext, parseMultiValuePointOfSale, shouldHandleMultiValuePos } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';
import { useEffect } from 'react';
import config from 'temp/config';

declare const _boxeverq: { (): void }[];
declare const Boxever: Boxever;

interface Boxever {
  getID(): string;
  eventCreate(data: BoxeverViewEventArgs, callback: () => void, format: string): void;
}

interface BoxeverViewEventArgs {
  browser_id: string;
  channel: string;
  type: string;
  language: string;
  page: string;
  pos: string;
}

function createPageView(locale: string, routeName: string) {
  try {
  // POS can be multi-valued (one entry per locale) or single valued so we parse it
  // POS must be valid in order to save events (domain name might be taken but it must be defined in CDP settings)
  // Later on point of sale should be available from layout service data - using env for now
  const parsedPos = (process.env.NEXT_PUBLIC_CDP_POINTOFSALE && shouldHandleMultiValuePos(process.env.NEXT_PUBLIC_CDP_POINTOFSALE)) ? 
    parseMultiValuePointOfSale(process.env.NEXT_PUBLIC_CDP_POINTOFSALE)[locale] : 
    process.env.NEXT_PUBLIC_CDP_POINTOFSALE
  const pointOfSale = parsedPos || window.location.host.replace(/^www\./, '');

  _boxeverq.push(function () {
    const pageViewEvent: BoxeverViewEventArgs = {
      browser_id: Boxever.getID(),
      channel: 'WEB',
      type: 'VIEW',
      language: locale,
      page: routeName,
      pos: pointOfSale,
    };

    Boxever.eventCreate(
      pageViewEvent,
      function () {
        /*empty callback*/
      },
      'json'
    );
  });
}
catch (error) {
  // if we have invalid data or request is failing we should abort event creation
  console.log('createPageView failed');
  console.log(error);
}
}

const CdpIntegrationScript = (): JSX.Element => {
  const {
    sitecoreContext: { pageEditing, route },
  } = useSitecoreContext();

  useEffect(() => {
    // Do not create events in editing mode
    if (pageEditing) {
      return;
    }

    route && createPageView(route.itemLanguage || config.defaultLanguage, route.name);
  });

  // Boxever is not needed during page editing
  if (pageEditing) {
    <></>;
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
                  client_key: '${process.env.NEXT_PUBLIC_CDP_CLIENT_KEY}',
                  target: '${process.env.NEXT_PUBLIC_CDP_TARGET_URL}',
                  cookie_domain: ''
              };
            `,
        }}
      />
      <Script src={process.env.NEXT_PUBLIC_CDP_SCRIPT_URL} />
    </>
  );
};

export default CdpIntegrationScript;
