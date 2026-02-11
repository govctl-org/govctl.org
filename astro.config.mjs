import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://govctl.org",
  adapter: vercel({
    // ISR: cache SSR pages for 1 hour, revalidate in background
    isr: {
      expiration: 60 * 60, // 1 hour in seconds
    },
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
