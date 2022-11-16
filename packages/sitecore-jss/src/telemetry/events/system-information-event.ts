import { TelemetryEvent } from './base-event';

interface SystemInformationEventIncomingAttrs {
  nodejsVersion: string;
  npmVersion: string;
  platform: string;
}
export const SystemInformationTelemetryEvent = ({
  nodejsVersion,
  npmVersion,
  platform,
}: SystemInformationEventIncomingAttrs): TelemetryEvent<SystemInformationEventIncomingAttrs> => {
  return {
    type: 'SystemInformation',
    attrs: {
      nodejsVersion,
      npmVersion,
      platform,
    },
  };
};
