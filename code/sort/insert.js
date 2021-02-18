// 插入排序
export const insertSort = (arr) => {

	for (let i = 1; i < arr.length; i++) {
		const temp = arr[i];

		while (i > 0 && arr[i - 1] > temp) {
			arr[i] = arr[i - 1];
			i--;
		}

		arr[i] = temp;
	}
}