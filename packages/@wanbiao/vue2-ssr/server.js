const Koa = require("koa");
const KoaRouter = require("@koa/router");
const { server } = require("./config");
const { createBundleRenderer } = require("vue-server-renderer");

const template = require("fs").readFileSync("./src/template.html", "utf-8");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
});

function craeteServer() {
  const app = new Koa();
  const router = new KoaRouter();

  app.use(router.routes()).use(router.allowedMethods());

  router.get("/(.*)", (ctx, next) => {
    const { request } = ctx;
    renderer.renderToString(request, (err, html) => {
      console.log(err, html);
      if (err) {
        if (err.code === 404) {
          ctx.status = 404;
          ctx.body = 'Page not found"';
        } else {
          ctx.status = 500;
          ctx.body = "Internal Server Error";
        }
      } else {
        ctx.status = 200;
        ctx.body = html;
      }
    });
  });

  return app;
}

craeteServer().listen(server.host, () => {
  console.log(`服务监听于: http://localhost:${server.host}`);
});
