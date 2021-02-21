// 防抖

const debounce = (fn, wait) => {
	let timer = null;

	return function () {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, wait);
	}
}