// 计算斐波那契数列
import { log } from '../../test/utils.js'

// 动态规划
function dynFib(n) {
	let val = new Array(n);

	if (n < 2) {
		return 1;
	} else {
		val[0] = 0;
		val[1] = 1;

		for (let i = 2; i <= n; i++) {
			val[i] = val[i - 1] + val[i - 2];
		}

		return val[n];
	}
}

// log(dynFib(10));

// 递归实现

function recurFib(n) {
	if (n < 2) {
		return n
	} else {
		return recurFib(n - 1) + recurFib(n - 2)
	}
}

// log(recurFib(10));

// 迭代
function iterFib(n) {
	let index = 2;
	let last = 1, lastNext = 0;
	let result;

	while (index <= n) {
		result = last + lastNext;
		lastNext = last;
		last = result;
		index++;
	}

	return result;
}

log(iterFib(10))
