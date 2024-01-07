import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  cookies().delete("jwt_token");
  return redirect("/");
}
