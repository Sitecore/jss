export type TelemetryEvent<Attributes = unknown> = {
  type: string;
  attrs: Attributes;
  date?: Date;
};

export type TelemetryEventInitializer<Attributes = unknown> = () => TelemetryEvent<Attributes>;
