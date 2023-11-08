/**
 * Software Development Kit (SDK) instance
 */
export type SDK<SDKType = unknown> = {
  /**
   * The Software Development Kit (SDK) library instance
   */
  sdk: SDKType;
  /**
   * Initializes the Software Development Kit (SDK)
   */
  init: () => Promise<void>;
};

/**
 * Software Development Kits (SDKs) to be initialized
 */
type SDKModulesType = Record<string, SDK>;

/**
 * Properties that are passed to the Context.
 */
export interface ContextInitProps {
  /**
   * Your Sitecore site name
   */
  siteName?: string;
}

/**
 * Configuration that is passed to the Context.
 */
export interface ContextConfig<SDKModules extends SDKModulesType> {
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
  /**
   * Software Development Kits (SDKs) to be initialized
   */
  SDK: { [module in keyof SDKModules]: SDKModules[module] };
}

/**
 * Context instance that is used to initialize the application Context and associated Software Development Kits (SDKs).
 */
export class Context<SDKModules extends SDKModulesType> {
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
  public readonly SDK: { [module in keyof SDKModules]?: SDKModules[module]['sdk'] } = {};
  /**
   * Promises for the SDKs
   */
  protected sdkPromises: { [module in keyof SDKModules]?: Promise<SDKModules[module]['sdk']> } = {};

  constructor(protected props: ContextConfig<SDKModules>) {
    this.sitecoreEdgeUrl = props.sitecoreEdgeUrl;
    this.sitecoreEdgeContextId = props.sitecoreEdgeContextId;
    this.siteName = props.siteName;
  }

  public init(props: ContextInitProps = {}) {
    // Context and SDKs are initialized only once
    if (this.isInitialized) return;

    this.isInitialized = true;

    if (props.siteName) {
      this.siteName = props.siteName;
    }

    // iterate over the SDKs and initialize them
    for (const sdkName of Object.keys(this.props.SDK) as (keyof SDKModules)[]) {
      this.initSDK(sdkName);
    }
  }

  /**
   * Retrieves the Software Development Kit (SDK) instance, ensuring it is initialized before returning
   *
   * @param {string} name SDK name
   * @returns initialized SDK
   */
  public getSDK<T extends keyof SDKModules>(name: T): Promise<SDKModules[T]['sdk']> | undefined {
    return this.sdkPromises[name];
  }

  /**
   * Initializes the Software Development Kit (SDK)
   *
   * @param {T} name SDK name
   * @returns {void}
   */
  protected initSDK<T extends keyof SDKModules>(name: T): void {
    this.sdkPromises[name] = new Promise((resolve) => {
      this.props.SDK[name].init().then(() => {
        this.SDK[name] = this.props.SDK[name].sdk;

        resolve(this.SDK[name]);
      });
    });
  }
}
