# 缓存方案
* [彻底理解浏览器的缓存机制](https://juejin.cn/post/6844903593275817998)
* [深入理解浏览器的缓存机制](https://cloud.tencent.com/developer/article/1484190)

## 目的
* 效益最大化
   * 减少不必要请求，节约资源
   * 增加用户体验
## 核心
* 每次请求都会查找缓存和标识
* 每次请求结果和标识存入缓存中

## 规则
### 强制缓存
* Expires
  * http1.0
  * 内容为到期时间

* Cache-Control（优先）
  * http1.1
  * public：所有内容都将被缓存（客户端和代理服务器都可缓存）
  * private：所有内容只有客户端可以缓存，Cache-Control的默认取值
  * no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
  * no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
  * max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效

* 补充
  * from memory cache
     * js或图片编译解析后存入，进程结束后清空
  * from disk cache
     * css只从磁盘读取并不存入内存中
	 * 进程开启时，从磁盘读取

### 协商缓存
* Last-Modified/If-Modified-Since
    * 内容为修改时间，精确到秒
* Etag/If-None-Match（优先）
    * 内容为服务器生成的唯一标识
* 成功后返回304
### push cache
* http2.0
* session级缓存

## 实践
### 强制缓存
### 协商缓存
### service worker
* [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
#### 概念
* 一个注册在指定源和路径下的事件驱动worker
* 运行在worker上下文
* 完全异步设计
* 只能https承载
#### 生命周期（3个）
* download
* install 
* activate
#### 创建
* 先注册，navigator.serviceWorker.register();
* install —— 填充缓存资源,waitUtil,caches
* activate —— 清除历史版本的影响
* fetch —— 控制响应，添加缓存
* terminate —— 关闭