export type BaseEventAttributes = {
  type: string;
};

export abstract class BaseEvent implements BaseEventAttributes {
  type = '';

  constructor(type: string) {
    this.type = type;
  }

  static send() {}
}
