// 持久化
// 简单粗暴理解就是吧东西存下来
// 或者说建个表
// 再想办法拿出来



(async ()=>{
	import mysql from 'mysql2/promise';
	// 当然实际不会是这些
	// 先跟着写一个
	const cfg={
		host:'localhost',
		user:'root',
		password:'233',
		database:'day1'
	};
	
	const connection=await mysql.createConnection(cfg);
	// 数据库操作
	// 跟jdbc没啥区别
	// 表名同上 假的
	let ret=await connection.execute('SELECT * from a');
	console.log('get ',ret);
})();
// 题外话
// 数据库连接池
// 压缩时间利器，有时间再整

// ORM
// 与数据库关联的对象

(async()=>{
	import Sequelize from 'sequlize';
	
	const seq=new Sequlize('233','233','233',{
		host: 'localhost',
		// 防不同数据库出错
		dialect: 'mysql',
		operatorsAliases: false
	});
	
	// 定义模型
	const mod=seq.define('mod',{
		seq1: {type: Sequelize.INTEGER,defaultValue:0},
		seq2: {type: Sequelize.STRING(10),allowNull:false}
	});
	
	// 模型同步到数据库
	// 模型不一定在库里有
	// 相当于开个新表？
	let res=await mod.sync();
	
	// 插入一条
	// sequelize还有findall、update啥的
	// 还是数据库操作
	res=mod.create({
		seq1: 1,
		seq2: '233'
	});
	console.log(res);
})();

// mangoDB
// 不用自己建个表
// 也不用自己建模型
(async()=>{
	import {MongoClient} from 'mongodb';
	const client=new MongoClient(
		'mongodb://localhost:12345',
		{
			useNewUrlParser: true
		}
	);
	
	let ret=await client.connect();
	const db=client.db('test');
	const mod=db.collection('233');
	// 用插入作为例子
	ret=await mod.insertOne({
		seq1: '1',
		seq2: 1,
	});
	console.log(ret);
})();

// mongoose
// 引入模型

// js异步调用结束的处理
// 参考https://www.cnblogs.com/zuobaiquan01/p/8477322.html
// callback 一个函数作为参数传到另一个函数后面执行
// generator async/await eventEmitter
// 发布订阅 