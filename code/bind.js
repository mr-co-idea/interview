// 实现bind

Function.prototype.Bind = function (ctx, ...args) {
	return (...args2) => this.apply(ctx, args.concat(args2));
}