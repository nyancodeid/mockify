import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import Vue from "@vitejs/plugin-vue";
import Icons from 'vite-plugin-icons';
import ViteFonts from "vite-plugin-fonts";

export default defineConfig({
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
  plugins: [
    Vue(),
    Icons(),
    VitePWA({
      manifest: {
        name: "InstaShare - Instant File Sharing",
        short_name: "InstaShare",
        description : "Instant File Sharing powered by IPFS Protocol",
        theme_color: "#212121",
        registerType: "autoUpdate",
        includeAssets: ['/favicon.svg'],
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
        ],
      },
    }),
    ViteFonts({
      google: {
        families: ['IBM+Plex+Mono']
      },
    })
  ]
})
