export async function POST(request: Request) {
  const { language } = await request.json();
  return new Response(JSON.stringify({ message: null, status: 200 }), {
    status: 200,
    headers: {
      "Set-Cookie": `language=${language}`,
      "Content-Type": "application/json",
    },
  });
}
