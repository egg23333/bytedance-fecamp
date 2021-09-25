// 仿照写法
// 还是路由匹配
 
async function init(ctx,init){
	const mode = ctx.app.$model[ctx.params.list];
	if(model){
		ctx.list = model;
		await next();
	}
	else{
		ctx.body = 'no model';
	}
}
	
async function list(ctx){
	ctx.body = await ctx.list.find({});
}

async function get(vtx){
	ctx.body = await list.findOne({_id : ctx.params.id});
}

export {init,list,get};