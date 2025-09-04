declare module 'vue' {
  interface ComponentCustomProperties {
    $router: { push(to: string): void };
  }
}
export {};
