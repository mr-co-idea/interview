// 动态希尔排序

export const shellSort = (arr) => {
	let h = 1, N = arr.length;

	while (h < N / 3) {
		h = h * 3 + 1;
	}
}