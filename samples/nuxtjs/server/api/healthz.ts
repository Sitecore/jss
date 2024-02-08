export default defineEventHandler((event) => {
  console.log(event);
  setResponseStatus(event, 200);
  return 'Healthy';
});
