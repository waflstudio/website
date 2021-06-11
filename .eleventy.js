const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyRssPlugin = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

module.exports = function (config) {
  // Enable the merging of data array (e.g. tags)
  config.setDataDeepMerge(true);

  // minify the html output
  config.addTransform("minify", require("./utils/transforms/minify.js"));

  registerPlugins(config);

  // shortcodes
  registerShortcodes(config);

  // Add some utility filters
  registerFilters(config);

  // Layouts
  registerLayouts(config);

  return {
    dir: {
      input: "views",
      output: "_output",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};

function registerLayouts(config) {
  config.addLayoutAlias("default", "layouts/base.njk");
}

function registerPlugins(config) {
  // add rss feed support
  config.addPlugin(eleventyRssPlugin);

  // add navigation support
  config.addPlugin(eleventyNavigationPlugin);
}

function registerShortcodes(config) {
  require("./utils/shortcodes/image.js")(config);
}

function registerFilters(config) {
  config.addFilter(
    "dateDisplay",
    require("./utils/filters/dateDisplay.js")
  );
  config.addFilter(
    "htmlDateString",
    require("./utils/filters/htmlDateString.js")
  );
  config.addFilter(
    "base64Encode",
    require("./utils/filters/base64Encode.js")
  );
  config.addFilter(
    "encodeURIComponent",
    require("./utils/filters/encodeURIComponent.js")
  );
  config.addFilter(
    "filterArray",
    require("./utils/filters/filterArray.js")
  );
  config.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });
}
