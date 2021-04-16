import * as trackingApi from './trackingApi';

export { trackingApi };

export {
  CampaignInstance,
  GoalInstance,
  OutcomeInstance,
  EventInstance,
  PageViewInstance,
  PageViewData,
} from './dataModels';

export { TrackingService, TrackingServiceConfig } from './tracking-service';
export { DummyTrackingService } from './dummy-tracking-service';
