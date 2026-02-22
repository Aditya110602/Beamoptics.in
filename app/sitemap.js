import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-02-22T00:00:00.000Z");

const ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/industries", changeFrequency: "weekly", priority: 0.9 },
  { path: "/industries/dairy", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries/food-products", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries/veterinary", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries/pharmaceutical", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries/public-health", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap() {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
