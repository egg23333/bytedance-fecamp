#!/usr/bin/env node

// 初始化部分
// 手动写个小工具
// 核心：重复工作自动化
// 可以一个点开一个js
// 实现功能以后可以重构

import fs from 'fs';

// 输入信息
// 还有选择框
import inquirer from 'inquirer';
const ans = await inquirer.prompt([
	{type:'input',name:'packageName',message:'set package name: '},
	{
		type:'number',
		name:'port',
		message:'set port: ',
		default:()=>8080
	},
	{
		type:'checkbox',
		name:'choice',
		choices:[
		{name:'1',},
		{name:'2',},
		],
	}
]);

console.log(ans);

function getRootPath(){
	import path from 'path';
	// 写工具要注意相对路径与绝对路径的问题
	// commonjs __dirname
	// es6 url.fileURLToPath和path
	// 其他的可能没改
	return path.resolve(process.cwd(),'hehe');
}

// 创建文件夹
fs.mkdirSync(getRootPath());

// 创建入口文件
// 可以手写  类似如下x
// 另外开了个模板文件写  跟不上
fs.writeFileSync(getRootPath()+'/index.js','index');
// npm整个 ejs也可以  如下
import ejs from 'ejs';
function createIndexTemplate(config){
	// 读模板
	const template=fs.readFileSync('./template/index.ejs');
	// 生成
	// ejs的活  看参数渲染
	// 也是种动态生成
	const code=ejs.render(template,{
		router: config.mid.router,
		static: config.mid.static,
	});
	console.log(code);
	
	// 代码格式化
	// prettier
	return prettier.format(code,{
		parser:'babel',
	});
	
}

// 创建package.json
// 跟上面入口文件也差不多
fs.writeFileSync(getRootPath()+'/package.json','package');

// 安装依赖
// package => npm/yarn
// 也是子进程安装，day1教的spawn
// 这里用个execa
execa('yarn',{
	cwd: getRootPath(),
	stdio:[2,2,2], //把子进程弄回主进程
});
