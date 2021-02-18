# 浏览器第一次输入URL后
* 参考[在浏览器输入 URL 回车之后发生了什么](https://juejin.cn/post/6844903922084085773)

## 过程
* URL解析
* DNS查询
* TCP连接
* 服务器处理请求
* 浏览器接受响应
* 渲染页面

## URL解析
*地址解析：
   * 编码
        * 参考[JS对url进行编码和解码（三种方式）](https://segmentfault.com/a/1190000013236956)
        1. encodeURI/decodeURI
        2. encodeURIComponent/decodeURIComponent
* 检查缓存

## DNS查询
* 递归查询：浏览器缓存、hosts缓存、路由器缓存、ISP DNS
* 迭代查询：根域名服务器
* DNS劫持
* dns-prefetch优化
    1.对静态资源域名做手动dns prefetching。
    2.对js里会发起的跳转、请求做手动dns prefetching。
    3.不用对超链接做手动dns prefetching，因为chrome会自动做dns prefetching。
    4.对重定向跳转的新域名做手动dns prefetching，比如：页面上有个A域名的链接，但访问A会重定向到B域名的链接，这么在当前页对B域名做手动dns prefetching是有意义的。

## TCP连接
## 服务器处理请求
## 浏览器接收响应
* 检查请求头
* 是否存在重定向
* 资源是否压缩
* 对资源进行缓存
* 根据媒体类型响应数据

## 渲染页面
* HTML解析 —— DOM树
   1. 解码 —— 二进制->UTF-8
   2. 预解析
   3. 符号化和构建树 —— DOMContentLoaded通知解析完成

* CSS解析 —— CSS规则树
   * 从右往左解析

* 渲染树 —— DOM树和CSS规则树合并
   * CSS 会阻塞 JS 执行
   * JS 会阻塞后面的 DOM 解析
   * defer、async
* 布局和绘制、合并渲染层
* 回流和重绘
* js执行 —— 运行栈