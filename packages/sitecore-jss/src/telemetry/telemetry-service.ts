import fs from 'fs';
import path from 'path';
import { TelemetryEventInitializer } from './events/base-event';

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

  static send(initializers: TelemetryEventInitializer[]) {
    if (!this.isEnabled()) return;

    let data = [];

    if (fs.existsSync(this.LOG_FILE_PATH)) {
      data = JSON.parse(fs.readFileSync(this.LOG_FILE_PATH, { encoding: 'utf-8' }));
    }

    const events = initializers.map((init) => {
      const ev = init();
      ev.date = new Date();

      return ev;
    });

    fs.writeFileSync(this.LOG_FILE_PATH, JSON.stringify([...data, ...events], null, 2));
  }
}

export default TelemetryService;
