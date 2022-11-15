export type TelemetryEvent<Attributes = { [key: string]: unknown }> = {
  type: string;
  attrs: Attributes;
};
