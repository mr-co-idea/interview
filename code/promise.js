// 手写promise

const pending = 'PENDING';
const fulfilled = 'FULFILLED';
const rejected = 'rejected';

class Promise {
	constructor(executor) {
		this.state = pending;
		this.executor = executor;
	}

	resolve(){
		if(this.state === pending){
			this.state = fulfilled;
			this.executor
		}
	}
}