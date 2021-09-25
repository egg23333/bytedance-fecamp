import {promisify} from 'util';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import clone from './download.js';
import spawn from 'child_process';
import open from 'open';

const fig = promisify(figlet);
const log = content=> console.log(chalk.white(content));
const sp = async (...args)=>{
	// spawn包装成可同步的调用
	const options=args[args.length-1];
	// 某种多平台的应对方式
	if(process.platform === 'win32'){
        // 设置 shell 选项为 true 以隐式地调用 cmd 
        options.shell = true
    }
	
	return new Promise(res=>{
		const proc=spawn(...args);
		// 输出流合并到主进程
		proc.stdout.pipe(process.stdout);
		proc.stderr.pipe(process.stderr);
		proc.on('close',()=>{
			res();
		});
	});
};

// 执行的主要东西就写这
const init = (async (name,address)=>{
	clear();
	// 印一个开始界面
	const data = await fig(name+' cli test');
	log(data);
	
	// 拉一个库
	log('create project '+name);
	await clone(address,name);
	
	// 下载依赖
	await sp('npm',['install'],{cwd:`./${name}`});
	log('finished');
	
	open('http://localhose:8080');
	await sp('npm',['run','serve'],{cwd:`./${name}`});
});

export default init;