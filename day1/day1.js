// -----------------------------fs--------------------------
// 单纯io
import fs from 'fs';
import {promisify} from 'util';

var data=fs.readFile('test.txt',function (err,data){
	if(err){
		return console.log(err);
	}
	console.log(data.toString());
})
// 同步io
data=fs.readFileSync('./test.txt');
console.log(data.toString());

// 异步 promise
(async () => {
	const read = promisify(fs.readFile);
	await read('./test.txt').then(res=>{
		console.log(res.toString());
	})
	.catch(err=>{
		console.log(err);
	});
})()
// -----------------------------buffer----------------------
// alloc:类似C calloc会归零
let buf=Buffer.alloc(10);
console.log(buf);

// concat 接
buf=Buffer.concat([buf,Buffer.from('233')]);
console.log(buf);
console.log(buf.toString());

buf=Buffer.from('233');
console.log(buf);

//-------------------------------http-------------------------
import http from 'http';

http.createServer((req,res)=>{
	const {url,method}=req;
	//状态处理
	//示例为请求url与请求方法及accept返回结果
	if(url==='/'&&method==='GET'){
		fs.readFile('1.html',(err,data)=>{
			//两种http头改法
			if(err){
				res.writeHead(500,{
					'Content-type':'text/plain;charset=utf-8'
				});
				res.end('500 boom');
				return;
			}
			//
			res.statusCode=200;
			res.setHeader('Content-type','text/html');
			res.end(data);
		})
	}
	else if(url==='/jsontest'&&method==='GET'){
		res.writeHead(200,{
			'Content-type':'text/javascript'
		});
		res.end(JSON.stringify({user:'1',age:'24'}));
	}
	// stream流
	// 类比c++ stringstream
	// 用起来还是有不同
	else if(url==='/pipetest'&&method==='GET'){
		fs.createReadStream('test.txt').pipe(res);
	}
	else{
		res.statusCode=404;
		res.setHeader('Content-type','text/plain;charset=utf-8');
		res.end('404 没了');
	}
})
.listen(8080,()=>{
	console.log('server at 8080');
});