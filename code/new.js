// 手写new

function newFn() {
	const fn = Array.prototype.shift.call(arguments);
	// const obj = {};

	// obj.__proto__ = fn.prototype;
	const obj = Object.create(fn.prototype);

	const val = fn.apply(obj, arguments);

	return typeof val === 'object' ? val : obj;
}

// 测试用例
function test(name) {
	this.name = name;
}

const obj1 = newFn(test, 'Jane');
const obj2 = new test('Jane');

console.info('obj1', obj1);
console.info('obj2', obj2);