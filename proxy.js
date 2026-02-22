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

function shouldRedirectDeprecatedServicesPath(pathname) {
  let normalizedPath = (pathname || "/").toLowerCase();
  try {
    normalizedPath = decodeURIComponent(normalizedPath);
  } catch {
    // Keep raw path when URL decoding fails.
  }

  const legacyServicePaths = new Set([
    "/we-offer",
    "/products",
    "/product",
    "/services-and-products",
    "/handheld-produce-scanner.html",
    "/handheld-produce-scanner",
    "/handheld-produce-scanner/",
    "/services/handheld-produce-scanner",
    "/services/handheld-produce-scanner/",
  ]);

  if (legacyServicePaths.has(normalizedPath)) return true;
  if (normalizedPath.startsWith("/handheld-produce-scanner/")) return true;
  if (normalizedPath.startsWith("/services/handheld-produce-scanner/")) return true;

  return false;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    shouldRedirectDeprecatedServicesPath(pathname) ||
    shouldRedirectDeprecatedScannerPath(pathname)
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/services";
    redirectUrl.search = "";

    const response = NextResponse.redirect(redirectUrl, 308);
    response.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|twitter-image).*)",
  ],
};
