import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-react';

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
  init: (props: InitSDKProps) => Promise<void>;
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
  /**
   * Sitecore page state (normal, preview, edit)
   */
  pageState?: LayoutServicePageState;
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
  sdks: { [module in keyof SDKModules]: SDKModules[module] };
}

/**
 * Properties that are passed to the Software Development Kit (SDK) initialization function.
 */
type InitSDKProps = Omit<ContextConfig<SDKModulesType>, 'sdks'>;

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
   * Sitecore page state (normal, preview, edit)
   */
  public pageState: LayoutServicePageState;
  /**
   * Software Development Kits (SDKs) to be initialized
   */
  public readonly sdks: { [module in keyof SDKModules]?: SDKModules[module]['sdk'] } = {};
  /**
   * Promises for the SDKs
   */
  protected sdkPromises: { [module in keyof SDKModules]?: Promise<SDKModules[module]['sdk']> } = {};

  constructor(protected props: ContextConfig<SDKModules>) {
    this.sitecoreEdgeUrl = props.sitecoreEdgeUrl;
    this.sitecoreEdgeContextId = props.sitecoreEdgeContextId;
    this.siteName = props.siteName;
    this.pageState = LayoutServicePageState.Normal;
  }

  public init(props: ContextInitProps = {}) {
    // Context and SDKs are initialized only once
    if (this.isInitialized) return;

    this.isInitialized = true;

    if (props.siteName) {
      this.siteName = props.siteName;
    }

    if (props.pageState) {
      this.pageState = props.pageState;
    }

    // iterate over the SDKs and initialize them
    for (const sdkName of Object.keys(this.props.sdks) as (keyof SDKModules)[]) {
      this.initSDK(sdkName);
    }
  }

  /**
   * Retrieves the Software Development Kit (SDK) instance, ensuring it is initialized before returning
   *
   * @param {string} name SDK name
   * @returns initialized SDK
   */
  public getSDK = <T extends keyof SDKModules>(name: T): Promise<SDKModules[T]['sdk']> => {
    return this.sdkPromises[name] || Promise.reject(`Unknown SDK '${String(name)}'`);
  };

  /**
   * Initializes the Software Development Kit (SDK)
   *
   * @param {T} name SDK name
   * @returns {void}
   */
  protected initSDK<T extends keyof SDKModules>(name: T): void {
    this.sdkPromises[name] = new Promise((resolve, reject) => {
      this.props.sdks[name]
        .init(this)
        .then(() => {
          this.sdks[name] = this.props.sdks[name].sdk;
          resolve(this.sdks[name]);
        })
        .catch((e) => {
          // if init rejects, getSDK will reject too now
          reject(e);
        });
    });
  }
}
