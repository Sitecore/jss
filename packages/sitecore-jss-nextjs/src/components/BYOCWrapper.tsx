import {
  BYOCWrapper,
  BYOCComponentParams,
  fetchBYOCComponentServerProps,
} from '@sitecore-jss/sitecore-jss-react';
import {
  GetStaticComponentProps,
  GetServerSideComponentProps,
} from '../sharedTypes/component-props';
import { constants } from '@sitecore-jss/sitecore-jss';

/**
 * This is a repackaged version of the React BYOCWrapper component with support for
 * server rendering in Next.js (using component-level data-fetching feature of JSS).
 */

/**
 * Will be called during SSG
 * @param {ComponentRendering} rendering
 * @returns {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (rendering) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  const params: BYOCComponentParams = rendering.params || {};
  const result = await fetchBYOCComponentServerProps(params);
  return result;
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * @returns {GetStaticPropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  const params: BYOCComponentParams = rendering.params || {};
  const result = await fetchBYOCComponentServerProps(params);
  return result;
};

export default BYOCWrapper;
