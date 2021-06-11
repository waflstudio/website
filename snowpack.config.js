/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  buildOptions: {
    out: "publish",
  },
  devOptions: {
    open: "none",
    tailwindConfig: "./tailwind.config.js",
    // Eleventy updates multiple files at once, so add a 300ms delay before we trigger a browser update
    hmrDelay: 300,
  },
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
  mount: {
    _output: {
      url: "/",
      static: true,
    },
    src: {
      url: "/dist",
    },
  },
  plugins: [
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "eleventy",
        watch: "$1 --watch",
      },
    ],
    ["@snowpack/plugin-postcss"],
    [
      "@snowpack/plugin-webpack",
      {
      },
    ],
  ],
};

module.exports = config;
