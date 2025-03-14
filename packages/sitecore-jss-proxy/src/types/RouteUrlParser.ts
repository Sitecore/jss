export type RouteUrlParser = (
  url: string
) => { sitecoreRoute?: string; lang?: string; qsParams?: string };
