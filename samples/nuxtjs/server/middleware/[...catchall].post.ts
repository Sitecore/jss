export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (url.pathname === '/') {
    console.log(event);
    await sendRedirect(event, '/site_vue-app');
  }
  console.log('start server middleware handler server');
  // for editing integration
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    if (body?.routeOverride) {
      event.context.routeOverride = JSON.parse(body.routeOverride.args[1]);
      // const override = useState('routeOverride');
      // override.value = routeOverride;
    }
  }
  console.log('end server middleware');
});
