import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://emilio-tapia.com",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: ["es", "en", "fr"],
        routing: {
          prefixDefaultLocale: false,
        },
        fallback: {
          fr: "es",
          en: "es",
        },
      },
    }),
  ],
});
