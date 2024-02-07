import { GetServerSideProps } from 'next';
import BYOC from 'src/byoc';
import * as FEAAS from '@sitecore-feaas/clientside/react';

/**
 * The FEAASRender page is responsible for:
 * - Rendering the FEAAS component if the "feaasSrc" is provided.
 * - Rendering all the registered components.
 * - The page is rendered only if it's requested by the api route (/api/editing/feaas/render) using the preview mode.
 */
const FEAASRender = ({ feaasSrc }: { feaasSrc: string }): JSX.Element => {
  return (
    <>
      {/** Render the component if the "feaasSrc" is provided  */}
      {feaasSrc && <FEAAS.Component src={feaasSrc} />}
      {/** Render all the registered components  */}
      <BYOC />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      feaasSrc: context.query.feaasSrc || null,
    },
    // Don't show the page if it's not requested by the api route using the preview mode
    notFound: !context.preview,
  };
};

export default FEAASRender;
