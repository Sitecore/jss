import { VisitorIdentification } from '@sitecore-jss/sitecore-jss-nextjs';

const Scripts = () => {
  return (
    <>
      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />
    </>
  );
};

export default Scripts;
