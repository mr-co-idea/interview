// 判断最长公共子串

import { log } from "../../test/utils.js";

const string1 = 'abbcd';
const string2 = 'dbbcc';

function lcs(word1, word2) {
	let arr = new Array(word1.length + 1);
	let index = 0, max = 0;

	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(word2.length + 1);

		for (let j = 0; j < arr[i].length; j++) {
			if (i == 0 || j == 0) {
				arr[i][j] = 0;
			} else {
				if (word1[i - 1] === word2[j - 1]) {
					arr[i][j] = arr[i - 1][j - 1] + 1;
				} else {
					arr[i][j] = 0;
				}
			}

			if (max < arr[i][j]) {
				index = i;
				max = arr[i][j];
			}
		}
	}

	for (let i = index - max; i <= max; i++) {
		str += word1[i];
	}

	return str;
}


log(lcs(string1, string2));