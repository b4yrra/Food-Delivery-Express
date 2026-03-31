import { cookies } from "next/headers";

export type SignInResponse = {
  secretToken: string;
};

export async function POST(request: Request) {
  const credentials = await request.json();
  const cookieStore = await cookies();

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = (await response.json()) as SignInResponse;
  cookieStore.set("token", data.secretToken);
  return new Response("OK");
}
