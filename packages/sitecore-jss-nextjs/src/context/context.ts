// Configuration for the Context
export interface ContextConfig {
  /**
   * Your Sitecore Edge URL
   */
  sitecoreEdgeUrl: string;
  /**
   * Your Sitecore Edge Context ID
   */
  sitecoreEdgeContextId: string;
  /**
   * Your Sitecore site name
   */
  siteName: string;
}

/**
 * Context instance that is used to initialize the application Context and associated Software Development Kits (SDKs).
 */
export class Context<SDKModules> {
  /**
   * Indicates whether the Context and SDK(s) have been initialized
   */
  public isInitialized = false;
  /**
   * The Sitecore Edge URL
   */
  public readonly sitecoreEdgeUrl: string;
  /**
   * The Sitecore Edge Context ID
   */
  public readonly sitecoreEdgeContextId: string;
  /**
   * The Sitecore site name
   */
  public siteName: string;
  /**
   * Software Development Kits (SDKs) to be initialized
   */
  public readonly SDK: { [module in keyof SDKModules]?: SDKModules[module] } = {};

  /**
   * Promises for the SDKs
   */
  protected promises: { [module in keyof SDKModules]?: Promise<SDKModules[module]> } = {};

  constructor(protected props: ContextConfig) {
    this.sitecoreEdgeUrl = props.sitecoreEdgeUrl;
    this.sitecoreEdgeContextId = props.sitecoreEdgeContextId;
    this.siteName = props.siteName;
  }

  /**
   * Initializes the Software Development Kit (SDK).
   * This function is the entry point for setting up the SDK.
   *
   * @param {string} name SDK name
   * @param {Function} cb Callback function that initializes the SDK
   */
  public async initSDK<T extends keyof SDKModules>(name: T, cb: () => Promise<SDKModules[T]>) {
    this.promises[name] = new Promise((resolve) => {
      cb().then((sdk) => {
        this.SDK[name] = sdk;

        resolve(sdk);
      });
    });

    await this.promises[name];
  }

  /**
   * Retrieves the Software Development Kit (SDK) instance, ensuring it is initialized before returning
   *
   * @param {string} name SDK name
   * @returns initialized SDK
   */
  public getSDK<T extends keyof SDKModules>(name: T): Promise<SDKModules[T]> | undefined {
    return this.promises[name];
  }
}
