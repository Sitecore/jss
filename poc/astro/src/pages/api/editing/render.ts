import type { APIRoute } from "astro";

export const POST: APIRoute = async (ctx) => {
  const body = await ctx.request.json();

  const response = await fetch(
    `${ctx.url.origin}/api/editing/page`,
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
