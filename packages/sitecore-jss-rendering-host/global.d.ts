declare module 'import-fresh' {
  export default function(modulePath: string): { [key: string]: (...args: unknown[]) => unknown };
}
