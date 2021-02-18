# commonjs 和 ES6 Module
* 参考[CommonJS和ES6模块的区别](https://juejin.cn/post/6844904067651600391#heading-6)

| 对比 | commonjs | ES6 Module | 其他 |
| --- | --- | --- | --- |
| 加载 | 同步 | 异步 | - |
| 引入 | 值的拷贝（深拷贝） | 值得引用（赋值） | - |
| 机理 | 运行时导出为对象 | 静态定义，代码静态分析阶段生成 | - |
| this | 当前模块对象 | undifined | - |
| 兼容 | 不兼容，采用mjs或type:"module" | 兼容，但只能引入整个对象 |