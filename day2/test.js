// 自动化测试
// 程序可测试性
// 测试->oop思想 SOLID
const add=require('./add.js');

//单测
//jest->匹配器
test('should 1+1=2',()=>{
	//数据准备
	const a=1;
	const b=1;
	//触发测试动作
	const r=add(a,b);
	//验证
	expect(r).toBe(2);
});


//状态测试
const User=require('./user1.js');

test('shoule getName',()=>{
	const user=new User('xiaohong');
	user.setName('xiaohei');
	except(user.getName()).toBe('xiaohei');
}));

//调用函数测试
//axios测试
//假设foo调用bar
//被调用函数初始化
jest.mock('./bar.js',()=>{
	//jest会创建一个与被测函数相同 但额外携带多个测试用参数的函数
	return jest.fn();
});

test('foo',()=>{
	foo();
	expect(bar).toHaveBeenCalled();
});