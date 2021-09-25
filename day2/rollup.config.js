// rollup练习
// 要求引入vue且不打包
// 支持json解析
// 生成esm和cjs两种
// esm代码压缩
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-tenser';

export default{
	input:'day2_1.js',
	output:[
	{
		file:'dist/bundle.cjs.js',
		format:'cjs',
	},
	{
		file:'dist/bundle.esm.js',
		format:'esm',
	},
	plugins:[commonjs(),json(),nodeResolve(),terser()],
	externel:['vue'],
};