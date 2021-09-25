import Button from './Button.vue';
import {mount} from '@cypress/vue';

// 组件测试
// cypress
// 直接开个浏览器跑测试
describe('Button'()=>}{
	it('should contain button',()=>{
		mount(Button);
		//检测组件
		cy.contains('button');
		//模拟事件
		cy.get('button').click();
	});
});

// @testing-library
// nodejs模拟浏览器环境 不好使

// 测试驱动开发TDD
// 先写测试再写组件

// git-hook
// git相关操作触发
// 配合husky使用