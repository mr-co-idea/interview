// 实现call

Function.prototype.Call = function () {
	let ctx = Array.prototype.shift.call(arguments);
	ctx = Object(ctx) || window;

	const fn = Symbol('fn');

	ctx[fn] = this;
	const result = ctx[fn](...arguments);
	delete ctx[fn];

	return result;
}

// 测试用例
const obj = {
	prop: 1
}

function test() {
	console.info(this.prop);
}

test();

test.Call(obj);