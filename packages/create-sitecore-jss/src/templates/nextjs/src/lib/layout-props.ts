import { LayoutServiceData, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Represents props accepted by <Layout /> component
 */
export interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}
