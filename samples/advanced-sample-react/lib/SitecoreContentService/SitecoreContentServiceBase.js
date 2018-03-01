export default class SitecoreContentServiceBase {
  constructor() {
    if (this.constructor === SitecoreContentServiceBase) {
      throw new Error(
        "SitecoreContentServiceBase is an abstract class and should not be instantiated"
      );
    }
  }

  // methods shared between data provider environments can go here
}
