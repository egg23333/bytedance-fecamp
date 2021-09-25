import koa from 'koa';
import config from './conf';
import loadModel from './framework/loader.js';

const app=new koa();

// 注册路由
// 反向工程 代码生成器，走模板，前面写过
// 动态编程
// 根据模型文件自动加载模块与生成路由
loadModel(config)(app);

// 填路由
import bodyParser from 'koa-bodyparser';
app.use(bodeyParser());
import restful from './framework/router.js';
app.use(restful);


app.listen(3000,()=>{
	console.log('server at 3000');
});