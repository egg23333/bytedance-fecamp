const btn = document.createElement('button');

btn.innerText='123'
btn.onclick = async ()=>{
	//bar.js
	
	// .then也行
	const {bar}=await import('./bar.js');
	console.log(bar());
	const {user}=await import('./user.js');
	console.log(user());
}

document.body.append(btn);

console.log('main');

// rollup打包
// 两个规范都支持
// 资源需要小 造轮子推荐

// vite
// 直接看官方文档快点
const koa=require('kao');
const fs=require('fs');

app.use((ctx)=>{
	const url=ctx.request.url;
	console.log(url);
	
	if(url==='/'){
		// 加载html
		ctx.body=fs.readFileSync('./1.html','utf-8');
	}
	else if(url.endsWith('.js')){
		// 拼接路径 加载 给服务器
		const p=path.resolve(__dirname,url_slice(1));
		// 匹配 import * from 'vue'
		// /(from\s+["|'])(?![\.\/])
		const source = fs.readFileSync(p,'utf-8');
		ctx.type='text/javascript';
		ctx.body=rewriteImport(source);
	}
	else if(url.startWith('@modules')){
		// node_modules查找对应依赖
		
		// 拼完整路径
		const modulename=url.replace('/@modules','');
		// const prefix=path.resolve(__dirname,'node_modules',modulename);
		const prefix=__dirname+'/node_modules'+modulename;
		const module=require(prefix+'/package.json').module;
		
		//读文件
		const source = fs.readFileSync(path.resolve(prefix,module),'utf-8');
		ctx.type='text/javascript';
		ctx.body=rewriteImport(source);
	}
}

function rewriteImport(source){
	return source.replace(/(from\s+['"])(?![\.\/])/g,'$1/modules/')
				.replace(/process\.env\.NODE_ENV/g,'development');
}

const dev_port=8080;

app.listen(dev_port,(ctx)=>{
	console.log('server on ${dev_port}');
});

// esbuild 依赖打包成一个文件 很快
// ts -> serve -> 浏览器可理解的文件 -> esbuild(js) -> 浏览器

// lodash-es 多个import 浏览器吃不消
// lodash-es 多个->一个(esbuild)