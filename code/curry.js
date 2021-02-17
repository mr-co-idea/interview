// 柯里化

function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {

			return fn.apply(this, args);

		} else if (args.length < fn.length) {

			return function (...args2) {
				return curried.apply(this, args.concat(args2));
			}
			
		}
	}
}