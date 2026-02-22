export async function GET() {
  return new Response("google-site-verification: googlef24171babb837aa7.html", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
