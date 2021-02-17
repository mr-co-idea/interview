// Koa中间件的实现

function compose(middleware) {
	return function (context, next) {
		let index;

		return dispatch(0)

		function dispatch(i) {
			index = i;
			let fn = middleware[i];

			if (i === middleware.length) fn = next;
			if (!fn) return Promise.resolve();

			try {
				return Promise.resolve(fn(context, function next() {
					return dispatch(i + 1);
				}))
			} catch (e) {
				console.warn(e);
				return Promise.reject(e);
			}
		}
	}
}