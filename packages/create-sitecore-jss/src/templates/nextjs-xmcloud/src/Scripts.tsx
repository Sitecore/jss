import { JSX } from 'react';
import { EditingScripts } from '@sitecore-jss/sitecore-jss-nextjs';
// The BYOC bundle imports external (BYOC) components into the app and makes sure they are ready to be used
import BYOC from 'src/byoc';
import FEAASScripts from 'components/FEAASScripts';

const Scripts = (): JSX.Element => {
  return (
    <>
      <BYOC />
      <FEAASScripts />
      <EditingScripts />
    </>
  );
};

export default Scripts;
