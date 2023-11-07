/**
 * Context State that keeps track of the Context and Software Development Kits (SDKs)
 */
export interface ContextState<SDKModules> {
  /**
   * Your Sitecore Edge URL
   */
  sitecoreEdgeUrl: string;
  /**
   * Your Sitecore Edge Context ID
   */
  sitecoreEdgeContextId: string;
  /**
   * Software Development Kits (SDKs) that are initialized by the ContextInitializer
   */
  SDK: { [module in keyof SDKModules]?: SDKModules[module] };
  /**
   * Site name
   */
  siteName: string;
}

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
   * Software Development Kits (SDKs) to be initialized
   */
  protected SDK: { [module in keyof SDKModules]?: SDKModules[module] } = {};

  /**
   * Promises for the SDKs
   */
  protected promises: { [module in keyof SDKModules]?: Promise<SDKModules[module]> } = {};

  constructor(protected props: ContextConfig) {}

  /**
   * Retrieves the context object.
   *
   * @param {Object} params incoming parameters
   * @param {string} params.siteName Site name
   * @returns context object
   */
  public getState({ siteName = '' }: { siteName?: string } = {}): ContextState<SDKModules> {
    return {
      sitecoreEdgeUrl: this.props.sitecoreEdgeUrl,
      sitecoreEdgeContextId: this.props.sitecoreEdgeContextId,
      SDK: this.SDK,
      siteName,
    };
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
   * Retrieves the SDK instance, ensuring it is initialized before returning
   *
   * @param {string} name SDK name
   * @returns initialized SDK
   */
  public getSDK<T extends keyof SDKModules>(name: T): Promise<SDKModules[T]> | undefined {
    return this.promises[name];
  }
}
