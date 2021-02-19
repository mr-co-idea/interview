# 存储
* 参考[mdn_cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

## 清单
* [cookie](#cookie)
* [storage](#storage)
* [indexDB](#indexDB)

## cookie
### 概念
* 是服务器发送到用户浏览器并保存在本地的一小块数据
* 浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销

### 创建
* `Set-Cookie: <cookie名>=<cookie值>`
* 对该服务器发起的每一次新请求，浏览器都会将之前保存的Cookie信息通过 Cookie 请求头部再发送给服务器

### 生命周期
* 会话cookies，每次会话结束后释放（浏览器的会话恢复功能会影响）
* 持久性 Cookie 的生命周期
    * 过期时间（Expires）
	* 有效期（Max-Age）指定的一段时间。

### 限制访问cookie
* Secure
* Httponly
    * 禁止document.cookie读取（防止xxs攻击）

### 作用域
* Domain 属性
   * 设置后允许子域共享
* Path 属性
   * 指定了主机下的哪些路径可以接受 Cookie
* SameSite attribute
   * None
   * Strict
   * Lax

## storage

## indexDB