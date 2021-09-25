// 项目打包
// webpack  支持js


const path=require('path');
const json5=require('json5');
const htmlWebPlugin=require('html-webpack-plugin');

module.exports={
	mode:'development',
	entry:'./day2_1.js',
	output:{
		path: path.resolve(__dirname,'dist'),
		filename:'[name].js',
		// webpack5特有
		// 清理原来的文件
		clean:true,
	},
	// 插件
	plugins:[
		new htmlWebPlugin({
			title:'233',
		}),
	],
	module:{
		// js以外的文件上loader
		// loader要提前install
		// webpack加载的loader按从后往前的顺序执行
		// 最后整成js给到webpack
		// 也可以在type写javascript/auto阻止默认loader
		rules:[
			{
				test:/\css$/i,
				use:['style-loader','css-loader'],
			},

			// 部分类型在webpack新版本有原生支持
			{
				test:/\.(png|jpg|jpeg|gif)$/i,
				type:'asset/resourse',
			},
			//也可以换parser 比如json5文件
			{
				test:/\.json5$/i,
				type:'json',
				parser:{
					paese:json5.parse
				},
			},
			{
				test: /\.js/,
				use: [{
					loader: 'babel-loader', 
					options: {
						"babelrc": false,
						"plugins": [
							"dynamic-import-webpack"
						]
					}
				}]
			},
		],
	},
	// 开发服务器
	// debug的
	// 随改随编译
	devServer:{
		static:'./dist',
	},
	// 代码优化
	// 代码分割
	// 下面用的是splitChunks
	// 另一种是用dependOn
	optimization:{
		splitChunks:{
			chunks:'all',
		},
	},
};

