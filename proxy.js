import { NextResponse } from "next/server";

function shouldRedirectDeprecatedScannerPath(pathname) {
  let normalizedPath = (pathname || "/").toLowerCase();
  try {
    normalizedPath = decodeURIComponent(normalizedPath);
  } catch {
    // Keep raw path when URL decoding fails.
  }
  if (normalizedPath === "/services") return false;

  const hasHandheldScannerWords =
    normalizedPath.includes("handheld") && normalizedPath.includes("scanner");
  const hasLegacySlug =
    normalizedPath.includes("handheld-produce-scanner") ||
    normalizedPath.includes("handheld produce scanner") ||
    normalizedPath.includes("produce-scanner");

  return hasHandheldScannerWords || hasLegacySlug;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (shouldRedirectDeprecatedScannerPath(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/services";
    redirectUrl.search = "";

    const response = NextResponse.redirect(redirectUrl, 308);
    response.headers.set("x-robots-tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|twitter-image).*)",
  ],
};
