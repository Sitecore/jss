import { ComponentRendering} from '@sitecore-jss/sitecore-jss-nextjs';

// NULL means Hidden by this experience
export type ComponentRenderingWithExpiriences = ComponentRendering & {
  experiences: { [name: string]: ComponentRenderingWithExpiriences | null };
};
