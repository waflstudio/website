const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, cls, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [300, 435, 600, 800, 1000, null],
    formats: ["webp", "avif", "jpeg", "svg"],
    outputDir: "./dist/images",
    urlPath: "/images/",
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("img", imageShortcode);
  eleventyConfig.addLiquidShortcode("img", imageShortcode);
  eleventyConfig.addJavaScriptFunction("img", imageShortcode);
};
