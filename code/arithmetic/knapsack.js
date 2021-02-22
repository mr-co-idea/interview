// 背包问题

import { log } from "../../test/utils.js";

function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...args2) {
				return curried.apply(this, args.concat(args2));
			}
		}
	}
}

function max(a, b) {
	return a > b ? a : b;
}

// 递归
function recurKnapsack(size, value, n, capacity) {
	let fn = curry(recurKnapsack)(size, value, --n);

	if (n < 0 || capacity === 0) {
		return 0;
	}
	if (capacity < size[n]) {
		return fn(capacity);
	} else {
		return max(value[n] + fn(capacity - size[n]), fn(capacity));
	}
}

// 动态规划
function dynKnapsack(size, value, n, capacity) {
	let arr = new Array(n + 1);

	for (let i = 0; i <= n; i++) {
		arr[i] = new Array(capacity + 1);

		for (let j = 0; j <= capacity; j++) {
			if (i == 0 || j == 0) {
				arr[i][j] = 0;
			}
			else if (size[i - 1] <= j) {
				arr[i][j] = max(value[i - 1] + arr[i - 1][j - size[i - 1]], arr[i - 1][j])
			} else {
				arr[i][j] = arr[i - 1][j];
			}
		}
	}

	return arr[n][capacity]
}


// 测试用例
let value = [4, 5, 10, 11, 13];
let size = [3, 4, 7, 8, 9];
let capacity = 16;
let n = 5;

function testOrigin(size, value, n, capacity, fn) {
	return fn(size, value, n, capacity);
}

let test = curry(testOrigin)(size, value, n, capacity);

// log(test(recurKnapsack)); 23

log(dynKnapsack(size, value, n, capacity));