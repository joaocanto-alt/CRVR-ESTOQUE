import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CRVR Estoque",
    short_name: "CRVR Estoque",
    description: "Controle interno de estoque, EPIs e materiais da CRVR São Leopoldo.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F3F7F4",
    theme_color: "#064B2D",
    orientation: "portrait",
    lang: "pt-BR",
    icons: [
  {
    src: "/pwa/icon-192.png",
    sizes: "192x192",
    type: "image/png",
    purpose: "any",
  },
  {
    src: "/pwa/icon-192.png",
    sizes: "192x192",
    type: "image/png",
    purpose: "maskable",
  },
  {
    src: "/pwa/icon-512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "any",
  },
  {
    src: "/pwa/icon-maskable-512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable",
  },
],
  };
}
