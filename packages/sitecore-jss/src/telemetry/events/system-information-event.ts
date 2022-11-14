import os from 'os';
import { execSync } from 'child_process';
import { BaseEventAttributes } from './base-event';
import { TelemetryService } from './../telemetry-service';
import { BaseEvent } from './base-event';

interface SystemInformationEventAttributes extends BaseEventAttributes {
  nodejsVersion: string;
  npmVersion: string;
  platform: string;
}

export class SystemInformationTelemetryEvent extends BaseEvent {
  private telemetryService: TelemetryService;
  constructor() {
    super('SystemInformation');
    this.telemetryService = new TelemetryService();
  }

  async send() {
    // Collect all the required information
    const event: SystemInformationEventAttributes = {
      nodejsVersion: this.checkNodeVersion(),
      npmVersion: this.checkNpmVersion(),
      platform: os.platform(),
      type: this.type,
    };

    await this.telemetryService.sendEvent(event);

    return Promise.resolve();
  }

  protected checkNpmVersion() {
    const output = execSync('npm --version', {
      encoding: 'utf-8',
    });
    return output;
  }

  protected checkNodeVersion() {
    const output = execSync('node --version', {
      encoding: 'utf-8',
    });
    return output;
  }
}
