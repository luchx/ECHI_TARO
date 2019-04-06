// eslint-disable-next-line import/no-commonjs
const Koa = require('koa');
// eslint-disable-next-line import/no-commonjs
const Router = require('koa-router');
// eslint-disable-next-line import/no-commonjs
const requestConfig = require('./request')

const app = new Koa();
const router = new Router();
const origin = '/mock/'

requestConfig.map((item)=>{
  router[item.type || 'post'](`${origin}${item.url}`, (ctx) => {
    ctx.body=item.data || {}
  });
})

app
  .use(router.routes())
  .use(router.allowedMethods());

  app.listen(8010);
