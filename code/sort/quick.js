// 快速排序

export const quickSort = (arr) => {
	if (arr.length === 0) return [];

	let lesser = [], greater = [];

	let pivot = arr[0];
	for (let i = 1; i < arr.length; i++) {
		let target = arr[i];

		if (target < pivot) {
			lesser.push(target);
		} else {
			greater.push(target);
		}
	}

	return quickSort(lesser).concat(pivot, quickSort(greater));
}