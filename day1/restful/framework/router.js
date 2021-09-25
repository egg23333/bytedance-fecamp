import router from 'koa-router';
import * from './api.js';

// 仿照写法
// 路由匹配

router.get('/api/:list/:id',init,get);
router.get('/api/:list',init,list);

export router.routes();