// 排序测试用例
import { log } from './utils.js';
import { insertSort, selectSort,quickSort,shellSort} from '../code/sort/index.js'

class App {
	static createArr(len) {
		let arr = new Array(len);

		for (let i = 0; i < len; i++) {
			arr[i] = Math.floor(Math.random() * (len + 1));
		}

		return arr;
	}
}

// 测试数据
let arr = App.createArr(10);
log(...arr);

// 插入排序
// insertSort(arr);

// 希尔排序
shellSort(arr);

// 选择排序
// selectSort(arr);

// 快排
// arr = quickSort(arr);



log(...arr);