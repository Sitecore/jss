import fs from 'fs';
import path from 'path';
import { TelemetryEvent } from './events/base-event';

export class TelemetryService {
  static LOG_FILE_PATH = path.resolve(__dirname, './telemetry-log.txt');

  static disable() {
    process.env.JSS_TELEMETRY = 'false';
  }

  static enable() {
    process.env.JSS_TELEMETRY = 'true';
  }

  static isEnabled() {
    return process.env.JSS_TELEMETRY !== 'false';
  }

  static send(events: TelemetryEvent[]) {
    if (!this.isEnabled()) return;

    let data = [];

    if (fs.existsSync(this.LOG_FILE_PATH)) {
      data = JSON.parse(fs.readFileSync(this.LOG_FILE_PATH, { encoding: 'utf-8' }));
    }

    fs.writeFile(this.LOG_FILE_PATH, JSON.stringify([...data, ...events], null, 2), (err) => {
      if (err) {
        console.error('Error writing telemetry log file', err);
        return;
      }
    });
  }
}

export default TelemetryService;
