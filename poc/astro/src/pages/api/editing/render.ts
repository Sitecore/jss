import type { APIRoute } from "astro";
import jss from '@sitecore-jss/sitecore-jss';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const body = await ctx.request.json();

  jss.debug.common('/api/editing/render executing...')

  const response = await fetch(
    `http://${ctx.request.headers.get('host')}/api/editing/page`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.text();

  return new Response(JSON.stringify({ html: data }), { status: 200 });
};
