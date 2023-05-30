/**
 * Configuration for ComponentBuilderBase
 */
export type ComponentBuilderBaseConfig<ComponentType> = {
  /**
   * List of components to be stored
   */
  components: Map<string, ComponentType>;
};

/**
 * ComponentBuilder is a abstract base class for building components based on the configuration.
 * Base implementation requires componentFactory to be implemented.
 */
export abstract class ComponentBuilderBase<ComponentType> {
  /**
   * List of components to be stored
   */
  protected components: Map<string, ComponentType>;

  constructor(protected config: ComponentBuilderBaseConfig<ComponentType>) {
    this.components = new Map([...config.components]);
  }

  /**
   * Component factory implementation
   */
  protected abstract getComponentFactory(): unknown;
}
