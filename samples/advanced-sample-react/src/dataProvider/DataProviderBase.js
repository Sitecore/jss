class DataProviderBase {
  constructor() {
    if (this.constructor === DataProviderBase) {
      throw new Error('DataProviderBase is an abstract class and should not be instantiated');
    }
  }

  // methods shared between data provider environments can go here
}

export default DataProviderBase;
