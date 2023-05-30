export type ComponentFactory<ComponentType> = (componentName: string) => ComponentType | null;

export type ComponentBuilderBaseConfig<ComponentType> = {
  components: Map<string, ComponentType>;
};

export abstract class ComponentBuilderBase<ComponentType> {
  protected components: Map<string, ComponentType>;

  constructor(protected config: ComponentBuilderBaseConfig<ComponentType>) {
    this.components = new Map([...config.components]);
  }

  protected abstract getComponentFactory(componentName: string): ComponentFactory<ComponentType>;
}
