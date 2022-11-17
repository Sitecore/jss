import { TelemetryEventInitializer } from './base-event';

type JssCommandEventAttrs = {
  command: string;
};

export const JssCommandTelemetryEvent = (
  command: string
): TelemetryEventInitializer<JssCommandEventAttrs> => () => {
  return {
    type: 'JssCommand',
    attrs: {
      command,
    },
  };
};
