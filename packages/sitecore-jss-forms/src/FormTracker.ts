import { ValueFormField } from './FormField';

interface TrackableValueFormField extends ValueFormField {
  focusedAtTick?: number;
  originalValue?: string | string[];
}

export interface TrackingEvent {
  formId: string;
  sessionId: string;
  eventId: string;
  fieldId: string;
  duration: number;
  fieldName: string;
}

enum EventIds {
  FieldCompleted = '2ca692cb-bdb2-4c9d-a3b5-917b3656c46a',
  FieldError = 'ea27aca5-432f-424a-b000-26ba5f8ae60a',
}

export interface FormTrackerOptions {
  formId: string;
  formSessionId: string;
  enableTracking: boolean;
  endpoint: string;
  // TODO: signature is temp
  fetcher?: (formData: TrackingEvent[], endpoint: string) => Promise<any>;
}

export function createFetchBasedTracker(options?: RequestInit) {
  return (formData: any, endpoint: string) => fetch(endpoint, {
    // IMPORTANT: Sitecore's antiforgery tokens require x-www-form-urlencoded to validate correctly.
    body: formData,
    method: 'post',
    // IMPORTANT: Sitecore forms relies on cookies for some state management, so credentials must be included.
    credentials: 'include',
    ...options,
  });
}

export class FormTracker {
  private _currentField: TrackableValueFormField | null = null;
  private _formId: string;
  private _formSessionId: string;
  private _enableTracking: boolean;

  // TODO temp signature
  private _fetcher: (formData: TrackingEvent[], endpoint: string) => Promise<any>;
  private _endpoint: string;

  constructor(options: FormTrackerOptions) {
    this._formId = options.formId;
    this._formSessionId = options.formSessionId;
    this._fetcher = options.fetcher || createFetchBasedTracker();
    this._endpoint = options.endpoint;
    this._enableTracking = options.enableTracking;
  }

  onFocusField(field: ValueFormField, value: string | string[]): void {
    console.log('focus', field.model.name)
    // TODO: isTrackingEnabled always seems false on fields wth?
    if (!this._enableTracking || !field.model.isTrackingEnabled) {
      //this._resetField();
      //return;
    }

    this._startTrackingField(field, value);
  }

  onBlurField(field: ValueFormField, value: string | string[], validationErrors?: string[]): void {
    const trackableField = field as TrackableValueFormField;
    console.log('blur', field.model.name, value)
    if (!this._enableTracking || !field.model.isTrackingEnabled) {
      //this._resetField();
      //return;
    }

    const blurredAtTick = new Date().getTime();

    let duration = trackableField.focusedAtTick ? Math.round((blurredAtTick - trackableField.focusedAtTick) / 1000) : 0;

    trackableField.focusedAtTick = undefined;

    const fieldChanged = this._currentField && this._currentField.fieldIdField.value !== trackableField.fieldIdField.value;
    if (fieldChanged) {
      this._startTrackingField(field, value);
      duration = 0;
    }
console.log('diff', fieldChanged, this._isValueChanged(value))
    if (fieldChanged || this._isValueChanged(value)) {
      if (this._currentField) {
        this._currentField.originalValue = value;
      }

      const clientEvent = this._buildEvent(field, EventIds.FieldCompleted, duration);

      const validationEvents: TrackingEvent[] = [];

      if (validationErrors) {
        validationErrors.forEach(() => {
          validationEvents.push(this._buildEvent(field, EventIds.FieldError, duration));
        });
      }

      this._trackEvents([...validationEvents, clientEvent]);
    }
  }

  private _startTrackingField(field: ValueFormField, value: string | string[]) {
    const trackableField = field as TrackableValueFormField;

    trackableField.focusedAtTick = new Date().getTime();
    trackableField.originalValue = value;
console.log('tracking', trackableField.model.name, trackableField.focusedAtTick);
    this._currentField = trackableField;
  }

  private _resetField() {
    this._currentField = null;
  }

  private _isValueChanged(newValue: string | string[]) {
    if (!this._currentField || typeof this._currentField.originalValue === 'undefined') {
      return true;
    }

    const originalValue = this._currentField.originalValue;

    if (Array.isArray(newValue)) {
      if (!Array.isArray(originalValue)) {
        return true;
      }

      // TODO array compare
      if (originalValue.length !== newValue.length) {
        return true;
      }

      for (let i = 0; i < originalValue.length; i += 1) {
        if (originalValue[i] !== newValue[i]) {
          return true;
        }
      }

      return false;
    }

    // original value is array but value is not so cannot be equal
    if (Array.isArray(originalValue)) {
      return false;
    }

    // string compare
    return newValue !== this._currentField.originalValue;
  }

  private _buildEvent(field: ValueFormField, eventId: EventIds, duration: number): TrackingEvent {
    return {
        formId: this._formId,
        sessionId: this._formSessionId,
        eventId,
        fieldId: field.fieldIdField.value,
        duration,
        fieldName: field.model.name,
    };
  }

  private _trackEvents(events: TrackingEvent[]) {
    console.log('trk', events);
    return this._fetcher(events, this._endpoint);
  }
}
