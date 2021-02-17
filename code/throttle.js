// 节流

const throttle = (fn, gap) => {

	let lastTime = null;

	return function () {
		let nowTime = new Date();

		if (nowTime - lastTime > gap || !lastTime) {
			fn.apply(this, arguments);
			lastTime = nowTime;
		}
	}
}