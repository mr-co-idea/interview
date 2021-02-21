# 登录
* 参考[前后端常见的几种鉴权方式](https://juejin.cn/post/6844903927100473357)

## 鉴权
* 验证用户是否拥有访问系统的权利（失败状态401）
* 四种
   * HTTP Basic Authentication
   * session-cookie
   * Token
   * OAuth

### HTTP Basic Authentication
* **核心**：是否登录 ——> 401 要求登录 ——> 登录 ——> 200 返回资源
* **场景**：建议内网，或者路由器登录
* **详情**
   | 步骤 | client | server | 说明 |
   | --- | --- | --- | --- |
   | 未登录 | 请求 | 响应：401,WWW-Authenticate:Basic realm='返回信息' | - |
   | 输入密码 | 再次请求，Authorization:Basic '用户名和密码（使用base64加密）' | 验证用户信息和密码 | 需要确保连接是可靠的 |
   | 通过 | 接收响应 | 响应资源 | 登录只能在会话结束后失效 |

### Session-cookie
* **核心**：登录 ——> 生成SID，缓存并下发 ——> cookies携带SID ——> 验证
* **概念**
    * cookie：HTTP请求是无状态的，它是管理服务器与客户端之间状态的标识，缓存在**客户端**
	* session：会话，保存标识当前会话浏览器的信息，缓存再**服务器**
* **详情**
    | 过程 | client | server | 说明 |
    | --- | --- | --- | --- |
    | 登录 | 发送用户名和密码 | 接收后，生成SessionID，响应Set-Cookie:sid | 签名：可通过密钥处理sid，防止客户端修改 |
    | 请求 | 请求头，cookie：sid | 验证sid | 服务端sid可存入redis |
* **缺点** 
    * 局限于浏览器使用
	* 假如将cookie存入redis，在分布式中占据较多内存空间
	* 在不是 Https 协议下使用 cookie ，容易受到 CSRF 跨站点请求伪造攻击

### Token
* **核心** ：访问 ——> 签发Token ——> 携带Token请求 ——> 校验
* 详情
   | 步骤 | client | server | 说明 |
   | 第一次访问 | 请求（携带用户名，密码） | 根据用户信息、时间戳、签名，签发Token | - |
   | 随后请求 | 请求头，Authorization：Token | 校验 | - |

* 优点
   * 安全
   * 不需要存储
   * 支持多种客户端，而不仅是浏览器。且不受同源策略的影响

* 缺点
   * 加密解密消耗使得 token 认证比 session-cookie 更消耗性能
   * token 比 sessionId 大，更占带宽

* **JWT**（JSON Web Token）

### OAuth
* Open Authorization
* 授权登录

## 单点登录
* SSO (Single Sign On )
* 参考[前端关于单点登录SSO的知识](https://juejin.cn/post/6844903664985866253)

### 同域单点登录 —— 子域名
* 登入SSO系统，写入cookie
* 利用cookie顶域设置
* 不是真正的单点登录

### 跨域单点登录 —— CAS流程
* app1系统未登录，跳转SSO系统
* 登入SSO系统，登录后携带server ticket返回app1
* app1的系统，向SSO验证ticket，通过生成session会话
* 写入浏览器cookie