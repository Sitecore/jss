export interface GenerateArgs {
  template: string;
}

export interface Answer {
  appName: string;
  destination: string;
  fetchWith: string;
  prerender: string;
  hostname: string;
}

export interface Generator {
  promptUser: () => void; // tbd
  generate: (args: GenerateArgs) => void; // tbd
}
