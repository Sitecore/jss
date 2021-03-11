import { ValueFormField } from './FormField';

export interface TrackableValueFormField extends ValueFormField {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrackerFetcher = (formData: TrackingEvent[], endpoint: string) => Promise<any> | void;

export interface FormTrackerOptions {
  endpoint: string;
  fetcher?: TrackerFetcher;
}

/**
 * @param {RequestInit} [options]
 */
export function createFetchBasedTrackerFetcher(options?: RequestInit): TrackerFetcher {
  return (formData, endpoint) =>
    fetch(endpoint, {
      body: JSON.stringify(formData),
      method: 'post',
      // IMPORTANT: Sitecore forms relies on cookies for some state management, so credentials must be included.
      credentials: 'include',
      ...options,
    });
}

export class FormTracker {
  private _currentField: TrackableValueFormField | null = null;
  private _formId?: string;
  private _formSessionId?: string;
  private _enableTracking?: boolean;
  private _fetcher: TrackerFetcher;
  private _endpoint: string;

  constructor(options: FormTrackerOptions) {
    this._fetcher = options.fetcher || createFetchBasedTrackerFetcher();
    this._endpoint = options.endpoint;
  }

  /**
   * Should be called prior to pushing any events, and again whenever new form schema data is received
   * @param {string} formId
   * @param {string} formSessionId
   * @param {string} enableTracking
   */
  setFormData(formId: string, formSessionId: string, enableTracking: boolean) {
    this._formId = formId;
    this._formSessionId = formSessionId;
    this._enableTracking = enableTracking;
  }

  onFocusField(field: ValueFormField, value: string | string[]): void {
    if (!this._enableTracking || !field.model.isTrackingEnabled) {
      this._resetField();
      return;
    }

    this._startTrackingField(field, value);
  }

  onBlurField(field: ValueFormField, value: string | string[], validationErrors?: string[]): void {
    const trackableField = field as TrackableValueFormField;
    if (!this._enableTracking || !field.model.isTrackingEnabled) {
      this._resetField();
      return;
    }

    const blurredAtTick = new Date().getTime();

    let duration = trackableField.focusedAtTick
      ? Math.round((blurredAtTick - trackableField.focusedAtTick) / 1000)
      : 0;

    trackableField.focusedAtTick = undefined;

    const fieldChanged =
      this._currentField &&
      this._currentField.fieldIdField.value !== trackableField.fieldIdField.value;
    if (fieldChanged) {
      this._startTrackingField(field, value);
      duration = 0;
    }

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

      // array compare
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
    if (!this._formId || !this._formSessionId) {
      throw new Error('Event was pushed without form data being set.');
    }

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
    return this._fetcher(events, this._endpoint);
  }
}
