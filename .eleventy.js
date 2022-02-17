const fs = require("fs");
module.exports = (eleventyConfig) => {
  //posts collection
  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("./src/content/posts/*.md");
  });

  //Pages collection
  eleventyConfig.addCollection("pages", (collection) => {
    return collection.getFilteredByGlob("./src/content/pages/*.md");
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  //404 routing in local environment
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: "src",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
