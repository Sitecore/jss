import { TelemetryEvent } from './events/base-event';

export class TelemetryService {
  static disable() {
    process.env.JSS_TELEMETRY = 'false';
  }

  static send(events: TelemetryEvent[]) {
    if (!process.env.JSS_TELEMETRY) return;

    // Write logs to the file /sitecore-jss/src/telemetry/log.txt
  }
}

export default TelemetryService;
