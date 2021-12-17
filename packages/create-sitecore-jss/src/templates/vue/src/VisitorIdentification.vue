<template>
  <meta
    v-if="visitorIdentificationTimestamp"
    name="VIcurrentDateTime"
    :content="visitorIdentificationTimestamp"
  />
</template>

<script>
/**
  VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
  If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
  For XM (CMS-only) apps, this should be removed.

  VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
 */
export default {
  name: 'VisitorIdentification',
  data() {
    const visitorIdentificationTimestamp =
      this.$jss.sitecoreContext().visitorIdentificationTimestamp;

    emitVIScript(visitorIdentificationTimestamp);

    return { visitorIdentificationTimestamp };
  },
};

let emittedVI = false;

function emitVIScript(visitorIdentificationTimestamp) {
  if (!emittedVI && typeof document !== 'undefined' && visitorIdentificationTimestamp) {
    emittedVI = true;
    const script = document.createElement('script');
    script.src = `/layouts/system/VisitorIdentification.js`;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
</script>
