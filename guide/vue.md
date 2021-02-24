# vue
* 参考[Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)

## 内容

### 生命周期和钩子函数
* 实例
    | 周期 | 概念 | 补充 |
	| --- | --- | --- |
	| beforeCreate | 实例初始化 | 获取不到data、methods，可以加loading |
	| created | 实例创建 | 可以访问data ，可以请求数据，结束loading |
	| beforeMount | 挂载的根节点创建完毕 | - |
	| mounted | 数据和DOM挂载完毕 | 可以获取DOM，操作DOM |
	| beforeUpdate | 数据发生改变，DOM尚未更新 | - |
	| updated | 更新DOM | 如果想区分数据更新，使用$nextTick |
	| beforeDestroy | 销毁前 | - |
	| destroyed | 销毁 | - | - |
	| activated | 缓存后进入 | - |
	| deactivated | 缓存后离开 | - |

* 嵌套组件
	* 在父组件mounted周期前初始化并挂载子组件，然后挂载父组件

### data为什么是函数
* 利用函数作用域，每次创建新的数据对象
### computed和watch
* computed注重在于计算，依赖于原有数据计算后得到并缓存，在原有数据未变化，直接从缓存获取
* 实例中被观察的数据变化时触发

### Vue无法检测property的添加或移除
* Vue不允许动态添加**根级别**的响应式property
    * 可以通过静态方法Vue.set(obj,property,value)或别名this.$set
* 直接替换对象
    * 将要添加的属性和原有属性添加到新对象中并赋值
### Vue不能检测以下数组的变动
   * 利用索引直接设置一个数组项 —— 利用set实现
   * 修改数组的长度 —— splice实现

## 原理
### 编译原理
* 生成AST抽象语法树
   * 自身属性
   * 和父级关系
   * 和子级关系

### 响应式原理 —— 订阅发布
* 数据劫持 —— Object.defineProperty
* 异步更新
   * 缓冲队列
   * 开启任务 —— 判断是否兼容降级
       * 微任务 Promise.then ——> MutationObserver ——> setImmediate
	   * 宏任务 setTimeout(fn,0)

### 双向数据绑定原理
### nextTick原理
### vuex原理
### vue-router原理
### diff算法