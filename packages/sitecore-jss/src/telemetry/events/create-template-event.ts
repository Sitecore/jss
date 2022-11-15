import { TelemetryEvent } from './base-event';

type CreateTemplateEventIncomingAttrs = {
  templates: string[];
  fetchWith?: string;
};

type CreateTemplateEventSendAttrs = {
  // Can be imported from sitecore-jss/package.json
  jssVersion?: string;
} & CreateTemplateEventIncomingAttrs;

export const CreateTemplateTelemetryEvent = ({
  templates,
  fetchWith,
}: CreateTemplateEventIncomingAttrs): TelemetryEvent<CreateTemplateEventSendAttrs> => {
  const jssVersion = '20';

  return {
    type: 'CreateTemplate',
    attrs: {
      templates,
      fetchWith,
      jssVersion,
    },
  };
};
