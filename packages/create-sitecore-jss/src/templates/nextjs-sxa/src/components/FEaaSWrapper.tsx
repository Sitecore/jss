import {
  GetServerSideComponentProps,
  GetStaticComponentProps,
  FEaaSComponent,
  FEaaSComponentProps,
  FEaaSComponentParams,
  fetchFEaaSComponentProps,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

const FEaaSWrapper = (props: FEaaSComponentProps): JSX.Element => {
  const styles = `component feaas ${props.params?.styles}`.trimEnd();
  const id = props.params?.RenderingIdentifier;
  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <FEaaSComponent {...props} />
      </div>
    </div>
  );
};

/**
 * Will be called during SSG
 * @param {ComponentRendering} rendering
 * Can be extended with the below
 * @param {LayoutServiceData} layoutData
 * @param {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (rendering) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  const params: FEaaSComponentParams = rendering.params || {};
  const result = await fetchFEaaSComponentProps(params);
  return result;
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * Can be extended with the below
 * @param {LayoutServiceData} layoutData
 * @param {GetServerSidePropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  const params: FEaaSComponentParams = rendering.params || {};
  const result = await fetchFEaaSComponentProps(params);
  return result;
};

export default FEaaSWrapper;
