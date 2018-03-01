class SitecoreContentServiceBase {
  constructor() {
    if (this.constructor === SitecoreContentServiceBase) {
      throw new Error(
        "SitecoreContentServiceBase is an abstract class and should not be instantiated"
      );
    }
  }

  // methods shared between data provider environments can go here
  getInitialRouteData() {
    return new Promise((resolve, reject) => {
      // no initial data, reject (which will cause data fetch to occur)
      if (!this.initialRouteData) reject("No initial data");

      // copy the initial state to a var, then empty it so it's not reused
      const data = this.initialRouteData;
      this.initialRouteData = null;

      // return the initial state
      resolve(data);
    });
  }

  setInitialRouteData(layoutServiceData) {
    this.initialRouteData = layoutServiceData;
  }
}

export default SitecoreContentServiceBase;
