import path from 'path';
import fs from 'fs';
import { TelemetryEventInitializer } from './base-event';

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
}: CreateTemplateEventIncomingAttrs): TelemetryEventInitializer<CreateTemplateEventSendAttrs> => () => {
  // /sitecore-jss/dist/cjs/telemetry/events -> /sitecore-jss/package.json
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../../../package.json'), 'utf-8')
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
