export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/api/products" && request.method === "GET") {
        const { results } = await env.DB.prepare(
          "SELECT * FROM products ORDER BY id DESC"
        ).all();

        return Response.json(results, { headers: corsHeaders });
      }

      return Response.json(
        { error: "Ruta no encontrada" },
        { status: 404, headers: corsHeaders }
      );
    } catch (error) {
      return Response.json(
        { error: "Error interno del servidor" },
        { status: 500, headers: corsHeaders }
      );
    }
  },
};
