import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "BeamOptics",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b5d95",
    icons: [
      {
        src: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
