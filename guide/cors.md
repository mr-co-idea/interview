#  浏览器跨域解决方案
* 参考[前端跨域解决方案归纳整理](#https://juejin.cn/post/6861553339994374157)

## 清单
* [CORS](#CORS)
* [Node中间件代理](#Node中间件代理)
* [jsonp](#jsonp)
* [postMessage](#postMessage)
* [webSocket](#webSocket)
* [iframe](#iframe)

## 同源 —— 安全策略（浏览器跨域）
* 协议 protocol
* 域名 domain
* 端口 port

## CORS —— 跨域资源共享
* 主要后台配置        
### 简单请求
#### 前端
* **方法**：get、head、post
* **字段信息**
1. Accept
2. Accept-Language
3. Content-Language
4. Last-Event-ID
5. Content-Type:
     1. application/x-www-form-urlencoded
	  2. multipart/form-data
	  3. text/plain
     
#### 后台
* head中设置Access-Control-Allow-Origin
    * \* / 域名
### 非简单请求
#### 前端
* 浏览器预检（http查询请求），询问服务器是否允许
#### 后台
* 检查 origin 是否处于白名单
* Access-Control-Request-Method
* Access-Control-Request-Headers
* Access-Control-Allow-Credentials
* Access-Control-Expose-Headers
* Access-Control-Max-Age

## Node中间件代理
* webpack-devServer方案
* nodejs充当服务器，请求由nodejs发起，服务器之间没有跨域
* 步骤
   * 拦截请求
   * nodejs发起请求获取响应
   * 返回响应

## Nginx反向代理
* 参考[Nginx反向代理与负载均衡](https://juejin.cn/post/6844903619465068551)
* 反向代理
   * proxy_pass
   * proxy_cookie_domain 
* 负载均衡
   * upstream

## jsonp
* 缺点：由于 script 本身的限制，该跨域方式仅支持 get 请求，且不安全可能遭受 XSS 攻击
* 步骤
   * 声明全局回调函数，参数为需要响应的数据
   * 页面添加script标签，地址为`URL？callback = 函数名`
   * 服务器将响应拼接成`函数名(响应数据)`

## postMessage
* otherWindow.postMessage(message,targetOrigin)

## webSocket
* 允许跨域通讯

## iframe
* documnent.domain
    * 二级域名相同
* window.name
    * string
* location.hash