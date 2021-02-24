# 面试总结

## 清单
* [浩方](#浩方)
* [cvte](#cvte)
* [shopee](#shopee)


## 浩方
### 一面
* 实现一个文件上传的限制并发
* ES6的新特性

## cvte
### 一面
* 自我介绍
* flex布局的了解
    * 探讨了大屏可视化，不允许内容滚动，怎么处理
	    * 没遇到过，说了把高度压缩，字体变小
		* 问我为什么不考虑rem
    * 比较尴尬的是问三栏布局，没回答上来`flex：1; flex: 3; flex: 1;`
* 对const let var 的理解
* set、map有用吗
* 闭包和作用域的理解
    * 结合了节流和防抖的使用
	   * 然后被问节流和防抖的概念，以及是否自己实现
* 事件循环的理解
   * setTimeout是否准时
* 第一次输入url后
* 前端缓存机质
* 前端性能优化（答得不好）
* 是否了解react
    * 没有
* vue的响应式原理
    * 数据劫持
	* 异步渲染
	    * 缓冲队列
		* 降级异步
* KeepAlive组件的了解
* 是否了解前端自动化部署
* git是否使用
* 问我薪资期望
* 问了下二面的是啥
   * 二面一些原理的编程实现
### 二面
* 自我介绍
* 项目里的内容
* vue的特性
    * 响应式
	    * 为什么使用proxy替代Object.definedProperty
    * 是否自定义指令（没有）
* webpack
    * webpack5有哪些更新（未答上来）
	* loader和plugins的区别
	* loader加载的是什么（未答上来）
* 前端性能优化（以为不会再问，害）
* 实现一个ES5继承
   * ```
        function inherit(subCons,cons){
			const prototype = Object.create(cons.prototype);
			prototype.constructor = subCons;
			subCons.prototype = prototype;
			return prototype
		}
   ```
   * 询问了Object.create实现了什么
* 事件循环说输出（比较简单，记不清了）
   * 顺便解释了一下宏微任务
* 实现求一个依赖并发请求的最短时间（没做出来）
   * 给定一系列的任务，这些任务可能有依赖关系，有依赖关系须相继执行，没有依赖关系则可以同时执行。 写一个函数，计算完成给定所有任务需要的时间。
   * ```
          //例如下面这些任务执行总时间为 4
          const tasks = [
              {
                  "name": "task1",
                  "time": 1,
                  "dependency": "",
              },
              {
                  "name": "task2",
                  "time": 2,
                  "dependency": "",
              },
              {
                  "name": "task3",
                  "time": 3,
                  "dependency": "task1" 
              },
          ];

          function getTime(tasks){

          }
   ```

## shopee
* 前十分钟感觉贼尴尬，想弃面，问啥啥不会
### 一面
* 自我介绍
* 时间复杂度和空间复杂度（答不上来）
    * 冒泡排序的时间空间复杂度
	* Array、栈、队列、Map的时间空间复杂度
* http请求的了解
    * http协议1.0、1.1、2.0、3.0
	* http请求头内容（回答并不好，不够条理化）
	* 请求的方式
* 缓存（html请求机质没答上来）
    * 策略
	* 文件被强缓存、如何更改后刷新
	     * 改变资源名称、html加载机质
* 跨域（非简单请求的请求方式回答错）
    * cors
	    * 简单
		* 非简单
		    * option请求
	* nodejs中间件
	* nginx代理
	* jsonp

* 登录
    * 手机扫码后，浏览器不同不同窗口，同时刷新，实现原理
	   * 尝试说了轮询和websocket

* 做题(5)
   1. 正则表达式去除首位`"`
       * `""""test""end""`
	   * `replace(/^"+|"+$/g,'')`
   2. 原型链（差点没解释清楚原因）
       * ```
	       function A(){};
		   A.prototype.n = 1;
		   const c = new A();
		   A.prototype = {
			   n:2,
			   m:3
		   }
		   const d = new A();

		   console.log(c.n)
		   console.log(c.m)
		   console.log(d.m)
		   console.log(d.m)
        ```

	3. Promise异常捕获（只说出不能捕获，问如何捕获，差点漏说.catch捕获，但不知道await后是可以捕获的）
	   * ```
	       async function async1(){
			   return throw New Error('error')
		   }
	       try{
			   async1();
		   }catch(e){
			   console.info('error')
		   }
        ```

	4. 事件循环说输出（async2输出那写的有问题，提示下修改正确了）
	    * ```
		    async function async1(){
				console.info('a'); 
				await async2();
				console.info('c');
			}

			async function async2(){
				console.info('b')
			}

			async1();

			setTimeout(()=>{
				console.info('d');
			},0);

			new Promise(resolve=>{
				console.info('e');
				resolve();
			}).then(()=>{
				console.info('f')
			})

			console.info('g')
		```
	5. js大数相加（没写出来，没读懂题目）
