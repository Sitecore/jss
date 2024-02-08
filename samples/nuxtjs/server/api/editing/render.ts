import { useFetch } from 'nuxt/app';

export default defineEventHandler(async (event) => {
  const bodyRaw = {
    routeOverride: await readBody(event),
  };
  const html = await await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyRaw),
  });
  let data = await html.text();
  data = data.replace(new RegExp('phkey', 'g'), 'key');
  console.log(data.slice(data.indexOf('<head>'), data.indexOf('</head>'))); // includes('<head>'));
  event.respondWith(new Response(JSON.stringify({ html: data }), { status: 200 }));
});
