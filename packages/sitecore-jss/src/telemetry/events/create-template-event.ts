import path from 'path';
import fs from 'fs';
import { TelemetryEvent } from './base-event';

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
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')
  );

  return {
    type: 'CreateTemplate',
    attrs: {
      templates,
      fetchWith,
      jssVersion: packageJson.version,
    },
  };
};
