import { TelemetryEvent } from './base-event';
import { version as jssVersion } from './../../../package.json';

type CreateTemplateEventIncomingAttrs = {
  templates: string[];
  fetchWith?: string;
};

type CreateTemplateEventSendAttrs = {
  jssVersion?: string;
} & CreateTemplateEventIncomingAttrs;

export const CreateTemplateTelemetryEvent = ({
  templates,
  fetchWith,
}: CreateTemplateEventIncomingAttrs): TelemetryEvent<CreateTemplateEventSendAttrs> => {
  return {
    type: 'CreateTemplate',
    attrs: {
      templates,
      fetchWith,
      jssVersion,
    },
  };
};
