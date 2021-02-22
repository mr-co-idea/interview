# 性能优化
* 参考[前端性能优化 24 条建议（2020）](https://segmentfault.com/a/1190000022205291)

## 加载时
1. 减少http请求
2. http1.1协议缓存http2.0协议
3. 服务端渲染SSR
4. 静态资源使用cdn
5. 将 CSS 放在文件头部，JavaScript 文件放在底部
6. 使用字体图标 iconfont 代替图片图标
7. 善用缓存
8. 文件压缩，开启gzip
9. 图片优化 
   1. 图片懒加载
   2. 响应式图片
   3. 控制大图加载
   4. 降低图片质量
   5. css代替图片
   6. 使用 webp 格式的图片

10. webpack打包
   1. 按需加载
   2. 将三方库单独打包
   3. babel优化ES6转ES5
   4. 打包为ES2017


## 运行时
1. 减少回流重绘
   * 参考[](https://segmentfault.com/a/1190000017329980)
   * 通过替换class来操作样式
   * 让被操作dom脱离文档，或者使用documentFragment
2. 事件委托
3. 良好的代码
   * 使用官方提供的方法
4. web worker