export type TelemetryEvent<Attributes = unknown> = {
  type: string;
  attrs: Attributes;
};
