import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  return new Response(JSON.stringify({ message: null, status: 200 }), {
    status: 200,
    headers: {
      "Set-Cookie": `SESSION_TOKEN=${token}`,
      "Content-Type": "application/json",
    },
  });
}
