// 获取vue模块名自动加进路由
// 
import fs from 'fs';
import handlebars from 'handlebars';
import chalk from 'chalk';

const refresh=async ()=>{
	// 读取文件列表
	const list=fs.readdirSync('./src/views')
				.filter((v)=>v!=="Home.vue")
				.map((v)=>({
					name: v.replace('.vue','').toLowerCase(),
					file: v,
				}));
	// 按模板生成路由
	compile({list},'/src/router.js','/template/router.js,hbs');
	// 生成菜单
	compile({list},'/src/App.js','/template/App.js,hbs');
	
	/*
	@param {*} meta 数据定义
	@param {*} filePath 目标文件
	@param {*} templatPath 模板文件
	*/
	function compile(meta,filePath,templatePath){
		if(fs.existsSync(templatePath)){
			const content=fs.readFileSync(templatePath).toString();
			const res=handlebars.compile(content)(meta);
			fs.writeFileSync(filepath,res);
			console.log(chalk.green('${filepath} created'));
		}
	}
};

export default refresh;