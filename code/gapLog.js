// 隔一秒打印0，1，2，3，4  —— 4种

function origin() {
	for (var i = 0; i < 5; i++) {
		setTimeout(() => {
			console.info(i);
		}, 1000 * i);
	}
}

// origin();

// 用let替代var，块作用域
function resolve1() {
	for (let i = 0; i < 5; i++) {
		setTimeout(() => {
			console.info(i);
		}, 1000 * i);
	}
}

// resolve1();

// 函数作用域
function resolve2() {
	for (var i = 0; i < 5; i++) {
		(function (i) {
			setTimeout(() => {
				console.info(i);
			}, 1000 * i);
		})(i)
	}
}

//async

async function resolve3() {
	for (var i = 0; i < 5; i++) {
		console.info(await new Promise(reject => {
			setTimeout(() => {
				reject(i)
			}, 1000); // 注意时间
		}))
	}
}

// resolve3();

// promise.all
function resolve4() {
	var arr = [];
	function log(i) {
		return new Promise(resolve=>{
			setTimeout(() => {
				console.info(i)
				resolve();
			}, 1000*i);
		})
	}

	for (var i = 0; i < 5; i++) {
		arr.push(log(i));
	}

	Promise.all(arr);
}

// resolve4();