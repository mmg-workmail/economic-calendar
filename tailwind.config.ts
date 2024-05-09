import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["IRANSansX"],
    },
    extend: {
      colors: {
        primary: "#002583",
        secondary: "#0172EF",
      },
    },
  },
};
