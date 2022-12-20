import { BaseArgs, Initializer } from '../../..';

export default class TestInitializer implements Initializer {
  get isBase(): boolean {
    return true;
  }

  async init(_args: BaseArgs) {
    return {
      nextSteps: [],
      appName: '',
      initializers: [],
    };
  };
}
