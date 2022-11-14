import { TelemetryService } from './../telemetry-service';
import { BaseEventAttributes } from './base-event';
import { BaseEvent } from './base-event';

interface CreateTemplateEventAttributes extends BaseEventAttributes {
  templates: string[];
  fetchWith?: string;
  // Can be imported from sitecore-jss/package.json
  jssVersion?: string;
}

export class CreateTemplateTelemetryEvent extends BaseEvent {
  private telemetryService: TelemetryService;
  constructor() {
    super('CreateTemplate');
    this.telemetryService = new TelemetryService();
  }

  async send(
    { templates, fetchWith }: Omit<CreateTemplateEventAttributes, 'jssVersion'>,
    { disabled }: { disabled: boolean }
  ) {
    //
    // Collect all the required information
    //
    // jssVersion will be collected here from '../../package.json'

    const event: CreateTemplateEventAttributes = { templates, fetchWith, type: this.type };

    await this.telemetryService.sendEvent(event);
  }
}
