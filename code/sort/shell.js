// 动态希尔排序

export const shellSort = (arr) => {
	let h = 1, N = arr.length;

	while (h < N / 3) {
		h = h * 3 + 1;
	}

	while (h > 0) {
		for (let i = h; i < N; i++) {
			for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
				let temp = arr[j];
				arr[j] = arr[j - h];
				arr[j - h] = temp;
			}
		}

		h = (h - 1) / 3
	}
}