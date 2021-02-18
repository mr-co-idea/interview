// 深拷贝

function checkType(target) {
	return Object.prototype.toString.call(target).slice(8, -1);
}

function deepClone(target) {
	let result, type = checkType(target);

	if (type === 'Object') {
		result = {};
	} else if (type === 'Array') {
		result = [];
	} else {
		return target;
	}

	for (let i in target) {
		let value = target[i], valueType = checkType(value);

		if (valueType === 'Object' || valueType === 'Array') {
			result[i] = clone(value);
		} else {
			result[i] = value;
		}
	}

	return result;
}


// 考虑循环
function clone(target, map = new WeakMap()) {

	if (typeof target === 'object') {
		let cloneTarget = Array.isArray(target) ? [] : {};
		if (map.get(target)) {
			return map.get(target);
		}
		map.set(target, cloneTarget);
		for (const key in target) {
			cloneTarget[key] = clone(target[key], map);
		}
		return cloneTarget;
	} else {
		return target;
	}
};

