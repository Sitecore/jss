import { ComponentRendering } from '../layout/models';

export interface SitecorePersonalizationContextState {
  /**
   * A value that indicates whether a route is tracked
   */
  isTracked: boolean;
  /**
   * Gets the personalized component.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {ComponentRendering | null | undefined} The personalized component.
   */
  getPersonalizedComponent(componentUid: string): ComponentRendering | null | undefined;
  /**
   * Provides a value that indicates whether the loading is in-progress.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {boolean} The value that indicates whether the loading is in-progress.
   */
  isLoading(componentUid: string): boolean;
  /**
   * Ensures the personalized component is loaded.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {ComponentRendering | null} The personalized component.
   */
  ensurePersonalizedComponentLoaded(componentUid: string): Promise<ComponentRendering | null>;
}

export class SitecorePersonalizationContext implements SitecorePersonalizationContextState {
  public isTracked: boolean;
  private components?: { [key: string]: ComponentRendering | null };
  private personalizationOperation: Promise<{
    [key: string]: ComponentRendering | null;
  }>;

  constructor(
    personalizationOperation: Promise<{
      [key: string]: ComponentRendering | null;
    }>,
    isTracked: boolean
  ) {
    this.personalizationOperation = personalizationOperation;
    this.isTracked = isTracked;
    personalizationOperation.then((components) => {
      this.components = components;
    });
  }

  /**
   * Gets the personalized component.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {ComponentRendering} The personalized component.
   */
  getPersonalizedComponent(componentUid: string): ComponentRendering | null | undefined {
    if (!this.components) {
      return undefined;
    }

    return this.components[componentUid];
  }

  /**
   * Provides a value that indicates whether the loading is in-progress.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {boolean} The value that indicates whether the loading is in-progress.
   */
  isLoading(componentUid: string): boolean {
    return !this.components || !this.components[componentUid];
  }

  /**
   * Ensures the personalized component is loaded.
   * @param {string} componentUid The unique identifier of a component.
   * @returns {ComponentRendering} The personalized component.
   */
  async ensurePersonalizedComponentLoaded(
    componentUid: string
  ): Promise<ComponentRendering | null> {
    const personalizedComponents = await this.personalizationOperation;

    return personalizedComponents[componentUid] ?? null;
  }
}
