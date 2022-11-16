import { TelemetryEvent } from './events/base-event';
import fs from 'fs';

export class TelemetryService {
  static disable() {
    process.env.JSS_TELEMETRY = 'false';
  }

  static send(events: TelemetryEvent[]) {
    if (!process.env.JSS_TELEMETRY) return;

    // Write logs to the file /sitecore-jss/src/telemetry/log.txt
    fs.writeFile('./../telemetry-log.txt', JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error('Error writing telemetry log file', err);
        return;
      }
    });
  }
}

export default TelemetryService;
