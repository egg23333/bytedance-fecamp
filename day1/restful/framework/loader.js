import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// 加载器
function load(dir,cb){
	const url = path.resolve(__dirname,dir);
	const files = fs.readdirSync(url);
	files.forEach(filename => {
		filename = filename.replace('.js','');
		const file = import(url+'/'+filebame);
		cb(filename,file);
	});
};

const loadModel = config => app => {
	mongoose.connect(config.db.url,config.db.options);
	const conn=mongoosse.connection;
	conn.on('error',()=>console.error('connection failed'));
	app.$model={};
	load('../mmodel',(filename,{schema}) => {
		console.log('load model: ' + filename,schema);
		app.$model[filename] = mongoose.model(filename,schema);
		
	});
}

export default loadModel;