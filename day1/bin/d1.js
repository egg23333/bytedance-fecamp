#!/usr/bin/env node
// 教写个命令行小玩意的
// 简单错报
// 配合npm link用

// console.log('bin test');
// console.log(process.argv);

import program from 'commander';
import init from '../lib/init.js';
import refresh from '../lib/refresh.js';


// es6还不让引入json
// var version=require('../package.json').version;

program.version(process.env.npm_package_version);
// 给自己写的东西加个小指令
program.command('init <name>')
	// 指令描述
	.description('test init')
	// 指令动作
	.action(init);
// 这里没放模板啥的
// 理论上不应该能执行
program.command('refresh')
	.description('refresh routers')
	.action(refresh);

// 解析命令行参数
program.parse(process.argv);