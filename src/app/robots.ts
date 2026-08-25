import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://anuj-bhattarai.com.np/sitemap.xml",
    host: "https://anuj-bhattarai.com.np",
  };
}
