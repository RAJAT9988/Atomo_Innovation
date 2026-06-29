const express = require("express");
const path = require("path");
const ejs = require("ejs");
const { redirects, primaryNav, footerColumns } = require("./lib/navigation");
const { siteConfig, organizationJsonLd } = require("./lib/seo/metadata");

const pagesRouter = require("./routes/pages");
const apiRouter = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.__express);
app.locals.primaryNav = primaryNav;
app.locals.footerColumns = footerColumns;
app.locals.getCta = require("./lib/cta").getCta;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Legacy URL redirects
for (const rule of redirects) {
  app.get(rule.source, (req, res) => {
    res.redirect(rule.permanent ? 301 : 302, rule.destination);
  });
}

app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/ai", express.static(path.join(__dirname, "ai")));
app.use("/section2icon", express.static(path.join(__dirname, "section2icon")));

app.use("/api", apiRouter);
app.use(pagesRouter);

app.use((req, res) => {
  res.status(404).render("404", {
    meta: { title: "Page Not Found | Atomo", description: "The page you requested could not be found.", url: `${siteConfig.url}${req.path}`, ogImage: `${siteConfig.url}/assets/brand/social-home.jpg` },
    path: req.path,
  }, (err, body) => {
    if (err) return res.status(404).send("Not Found");
    res.status(404).render("layout", {
      body,
      meta: { title: "Page Not Found | Atomo", description: "Not found", url: siteConfig.url, ogImage: `${siteConfig.url}/assets/brand/social-home.jpg` },
      path: req.path,
      site: siteConfig,
      year: new Date().getFullYear(),
      orgJsonLd: organizationJsonLd(),
    });
  });
});

const server = app.listen(PORT, () => {
  console.log(`Atomo website running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or run:`);
    console.error(`  PORT=${Number(PORT) + 1} npm run dev`);
    console.error(`  kill $(lsof -t -i:${PORT})`);
    process.exit(1);
  }
  throw err;
});

module.exports = app;
