const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // ── Passthrough copies ──────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/artist-template");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");


  // ── Watch targets ───────────────────────────────────────────────
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // ── Filters ─────────────────────────────────────────────────────
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // ── Shortcodes ──────────────────────────────────────────────────
  // Reusable section label
  eleventyConfig.addShortcode("label", (text) => {
    return `<span class="section-label">${text}</span>`;
  });

  // Feature list item
  eleventyConfig.addShortcode("feature", (text) => {
    return `<div class="feature-item"><span class="feature-item__check" aria-hidden="true">✓</span><span>${text}</span></div>`;
  });

  // ── Collections ─────────────────────────────────────────────────
  eleventyConfig.addCollection("phase1", (collectionApi) =>
    collectionApi.getFilteredByTag("phase1").sort((a, b) => a.data.order - b.data.order)
  );
  eleventyConfig.addCollection("phase2", (collectionApi) =>
    collectionApi.getFilteredByTag("phase2").sort((a, b) => a.data.order - b.data.order)
  );

  // ── Configuration ────────────────────────────────────────────────
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
