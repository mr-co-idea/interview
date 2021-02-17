# 网络相关
* 任 TCP 虐我千百遍，我仍待 TCP 如初恋

## 清单
* [TCP（传输层）](#TCP)
    * [关键词](#关键词)
    * [核心](#核心)
    * [问题](#问题)
* [UDP](#UDP)
* [HTTP（应用层）](#网络协议HTTP)

## 概念
* 参考：[OSI参考模型](https://zhuanlan.zhihu.com/p/31327310)
* 网络层
   * 同一网络下主机与主机之间的报文传输
* 传输层
   * 主机进程与不同主机进程之间的通讯

----------------------------------------------------------------------------------------------------------------------

## TCP
* 参考：[35 张图解：被问千百遍的 TCP 三次握手和四次挥手面试题](https://www.cnblogs.com/xiaolincoding/p/12638546.html)

### 关键词
* 标志位
* **SYN**: Synchronize Sequence Numbers —— 同步序列号
* **ACK**: Acknowledgement Character —— 确认字符
* **RST**: Reset the connection —— 复位
* **FIN**: Finish —— 结束
* 关键词
* MTU：Maximum Transmission Unit —— 最大传输单元
* MSS：Maximum Segment Siz —— 最大数据长度
* MSL：Maximum Segment Lifetime —— 报文最大生命周期

### 核心
* Transmission Control Protocol
* 序列号（32位） —— 解决网络包乱序问题
* 确认应答号（32位） —— 解决不丢包问题
* **面向连接**的、**可靠的**、基于**字节流**的传输层通信协议
* **TCP连接**
   * sokets: IP和端口
   * sequence numbers: 解决乱序
   * window sizes: 流量控制
   * Connections: The reliability and flow control mechanisms described above require that TCPs initialize and maintain certain status information for each data stream. The combination of this information, including sockets, sequence numbers, and window sizes, is called a connection
* **TCP建立**
   * **三次握手**的过程
       |state|client|server| 备注 |
       | --- | --- | --- | --- |
	   | 初始 | closed | closed |  server转listen状态（主动监听某端口） |
	   | 第一次握手 | 序列号 = client_isn, SYN = 1, 状态变为SYN_SENT| 服务器接收 | 不可携带数据 |
	   | 第二次握手 | 客户端接收| 序列号 = server_isn, 确认应答号 = client_isn + 1, SYN = 1, ACK = 1, 状态变为SYN_REVD | 不可携带数据 |
	   | 第三次握手 | 确认应答号 = server_isn + 1, ACK = 1, 状态变为ESTABLISHED | 服务器接收，状态变为ESTABLISHED | 可以携带数据 |

* **TCP连接断开**
   * **四次挥手**的过程
      |state|client|server|备注|
	  | --- | --- | --- | --- |
	  | 第一次挥手 |发出FIN报文，FIN = 1，状态变为 FIN_WAIT_1| 收到FIN报文 | 能接收数据 |
	  | 第二次挥手 | 收到ACK报文，状态变为FIN_WAIT_2 | 发出ACK报文，ACK = 1，状态变为WAIT_CLOSED | 能接收数据 |
	  | 第三次挥手 | 收到FIN报文 | 服务器处理完数据后，发送FIN报文，状态变为LAST_ACK | 能接收数据 |
	  | 第四次挥手 | 发出ACK报文，状态变为TIME_WAIT | 收到ACK报文，状态变为CLOSED，连接关闭 | 不能接收数据 |
	  | 等待关闭 | 经过2SML时间后，状态变为CLOSED，连接关闭 | - | - |

* soket编程
    * EOF：End of File —— 结束符
	* backlog —— 完成队列的长度
	* 连接
	   |节点|client|server|备注|
	   | --- | --- | --- | --- |
	   | 初始化 - 第一次握手 | 初始化soket，阻塞connect，发出SYN报文 | 初始化soket，bind绑定ip和端口，listen监听端口，接收报文，阻塞accept | 得到文件描述符 |
	   | 第二次握手 | 接收ACK、SYN报文，返回connect | 发出ACK、SYN报文 | - |
	   | 第三次握手 | 发出ACK报文 | 接收ACK报文，返回成功soket，返回connect，阻塞read | 连接成功soket和监听的soket是两个 |
	* 断开连接
	   | 节点 | client | server | 备注 |
	   | --- | --- | --- | --- |
	   | 初始化 - 第一次挥手 | 调用close主动关闭，发出FIN报文，进入FIN_WAIT_1 | read返回EOF | - |
	   | 第二次挥手 | 接收应答，进入FIN_WAIT_2 | 发出ACK报文，进入CLOSE_WAIT | - |
	   | 第三次挥手 | 接收FIN报文 | 调用close，发出FIN报文，进入LAST_ACK | - |
	   | 第四次挥手 | 发出ACK报文，进入TIME_WAIT，2MSL后关闭 | 接收ACK，关闭 | - |

### 问题
#### 1. TCP/IP和OSI模型的关系
* 参考：[OSI参考模型](https://zhuanlan.zhihu.com/p/31327310)
* OSI是理论模型、分为七层
* TCP/IP模型的原型为OSI模型

#### 2. 为什么需要TCP、TCP工作在哪一层
* IP 层（网络层）是不可靠的。
    * 不保证网络包的交付、不保证网络包的按序交付、也不保证网络包中的数据的完整性

* 传输层，TCP协议保障网络数据包的可靠性
    * 确保接收端接收的网络包是无损坏、无间隔、非冗余和按序的

#### 3. 确定一个唯一TCP连接
* TCP四元组：源地址、源端口号、目标地址、目标端口号
    * 源地址和目标地址存在IP头部中
	* 源端口和目标端口存在TCP头部中

#### 4. 有一个 IP 的服务器监听了一个端口，它的 TCP 的最大连接数是多少？
* 理论值：最大TCP连接数 = 客户端IP数 * 客户端端口数
   * ipv4下，ip数为2^32、客户端的端口数2^16 —— 合计2^48
* 服务端最大并发 TCP 连接数远不能达到理论上限
   * 文件描述符限制
   * 内存限制
#### 5. 如何在 Linux 系统中查看 TCP 状态？
* `netstat -napt`

#### 6. **为什么是三次握手？不是两次、四次？**
* 详细分析参考[35 张图解：被问千百遍的 TCP 三次握手和四次挥手面试题](https://www.cnblogs.com/xiaolincoding/p/12638546.html)
1. 防止历史连接初始化连接，造成混乱（主要原因）
     * 连接过时，client发出RST = 1，中止连接
2. 同步序列号
     * 确保双方序列号都能被同步
3. 避免资源浪费
     * 防止建立无效连接

#### 7. 为什么客户端和服务端的初始序列号 ISN 是不相同的？
* 防止滞留的历史报文被新的连接接收
* 防止黑客伪造TCP连接

#### 8. 既然 IP 层会分片，为什么 TCP 层还需要 MSS 呢？
* MTU：一个网络包的最大长度，以太网中一般为 1500 字节
* MSS：除去 IP 和 TCP 头部之后，一个网络包所能容纳的 TCP 数据的最大长度
* IP分片会造成分片丢失整个数据重传，而TCP分片丢失后只需传输丢失片段，效率高

#### 9. 什么是 SYN 攻击？如何避免 SYN 攻击？
* 占满服务端的 SYN 接收队列（未连接队列）
* SYN队列、ACCEPT队列
* 控制队列大小和当队列满时应做什么处理
* **tcp_syncookies 应对 SYN 攻击**
    * 当 「 SYN 队列」满之后，后续服务器收到 SYN 包，不进入「 SYN 队列」；
    * 计算出一个 cookie 值，再以 SYN + ACK 中的「序列号」返回客户端，
    * 服务端接收到客户端的应答报文时，服务器会检查这个 ACK 包的合法性。如果合法，直接放入到「 Accept 队列」。
    * 最后应用通过调用 accpet() socket 接口，从「 Accept 队列」取出的连接。

#### 10. **为什么需要四次挥手**
* 客户端FIN报文仅代表客户端不再发送数据，但还能接收数据
* 服务端通常需要等待完成数据的发送和处理，所以服务端的 ACK 和 FIN 一般都会分开发送，从而比三次握手导致多了一次

#### 11. **为什么 TIME_WAIT 等待的时间是 2MSL？**
* MSL报文的生命周期，对比TTL
* 2MSL时间可以满足，当ACK发出接收方未获得，而接收方再次发出FIN，这一来一回是两个周期
* 当再次收到FIN后，重新开始计时

#### 12. 为什么需要 TIME_WAIT 状态？
* 主动发起关闭连接的一方，才会有 TIME-WAIT 状态
* 防止具有相同四元组的旧的数据包被收到
* 保证被动关闭方能正常关闭（确保接收到ACK）;
* 时间不能过长，否则占用内存资源和端口资源

#### 13. 如果已经建立了连接，但是客户端突然出现故障了怎么办？
* 保活机质

## UDP
* User Datagram Protocol
* 头部8字节（64位）
    * 源端口号、目标端口号、包长、校验和
### 问题
#### 1. TCP和UDP的区别
| 划分 | **TCP** | **UDP** |
| --- | --- | --- |
| **连接** | 面向连接，传输数据前需要先建立连接 | 无需建立连接，即刻传输 |
| **服务对象** | 一条连接只有两个端点 | 支持一对一、一对多、多对多的交互通信 |
| **可靠性** | 可靠交付数据 | 尽最大努力交付，不保证可靠交付数据 |
| **拥塞控制、流量控制** | 有拥塞控制和流量控制机制，保证数据传输的安全性 | 没有控制机质，即使网络非常拥堵了，也不会影响 UDP 的发送速率 |
| **首部开销** | 首部长度较长，会有一定的开销，首部在没有使用「选项」字段时是 20 个字节 | 首部只有 8 个字节，并且是固定不变的，开销较小 |
| **传输方式** | 流式传输，没有边界，但保证顺序和可靠 | 一个包一个包的发送，是有边界的，但可能会丢包和乱序 |
| **分片不同** | 数据大小如果大于 MSS 大小，则会在传输层进行分片 | 数据大小如果大于 MTU 大小，则会在 IP 层进行分片 |
| **应用场景** | FTP 文件传输、HTTP / HTTPS | 包总量较少的通信，如 DNS 、SNMP 等，视频、音频等多媒体通信，广播通信 |

#### 2. 为什么TCP有头部长度字段，而UDP没有
* TCP头部有可变长字段，长度不固定，需要记录
* UDP长度不变，为8个字节 

#### 3. 为什么 UDP 头部有包长度字段，而 TCP 头部则没有包长度字段呢？
* TCP数据长度 = IP总长度 - IP首部长度 - TCP首部长度
* 为了网络设备硬件设计和处理方便，首部长度需要是 4字节的整数倍。


---------------------------------------------------------------------------------

## 网络协议HTTP
### 概念
* HyperText Transfer Protocol
* **定义**：HTTP 是一个在计算机世界里专门在**两点**之间传输文字、图片、音频、视频等**超文本**数据的**约定和规范**
* 状态码
    |状态码|含义|常见状态码|
	| --- | --- | --- |
	| **1XX** | 协议处理的**中间状态**，还需后续操作 | - |
	| **2XX** | **成功**，报文被正确处理 | 200，204，206 |                              
	| **3XX** | **重定向**，资源位置发生变化，需要重新请求 | 301，302，304 |
	| **4XX** | **客户端错误**，请求报文有误，服务器无法处理 | 400，403，404 | 
	| **5XX** | **服务器错误**，服务器在处理请求时内部出现错误 | 500，501，502，503 |

* 常见字段
   | 字段名 | 含义 | 备注 |
   | --- | --- | --- |
   | Host | 服务器域名 | www.A.com |
   | Content-Length | 数据长度 | 单位字节 |
   | Connection | TCP持久连接 | 为了兼容，字段值为Keep-Alive，非正式字段 |
   | Content-Type | 服务器响应的数据格式 | Accept在请求头中可表示接收的格式 |
   | Content-Encoding | 响应的数据压缩格式 |Accept-Encoding说明接收的压缩格式， gzip ，deflate |



### 状态码详情
| 状态码 | 含义 | 备注 |
| --- | --- | --- |
| 200 | Ok |成功，非HEAD请求，会返回响应头和body数据 |
| 204 | No Content | 和200相似，但没有请求头 |
| 206 | Partial Content | 分块下载或断点续传，表示body内容不是资源全部 |
| 301 | Moved Permanently | 资源不存在，改用新的url访问，访问地址在Location指明 |
| 302 | Found | 临时重定向，访问地址在Location指明，浏览器自动重定向 |
| 304 | Not Modified | 资源未修改，重定向到缓存文件 |
| 400 | Bad Request | 请求报文错误 |
| 403 | Forbidden | 服务器禁止访问资源 |
| 404 | Not Found | 资源在服务器上不存在 |
| 500 | Internal Server Error | 服务器异常 |
| 501 | Not Implemented | 尚不支持 |
| 502 | Bad Gateway | 服务器作为网关或代理返回的错误 | 
| 503 | Service Unavailable | 服务器繁忙 |
 
### GET和POST的区别
| 区别 | GET | POST | 备注 |
| --- | --- | --- | --- |
| 资源流向 | 从服务器获取资源 | 向服务器提交资源 | - |
| 安全和幂等 | 是 | 否 | 安全：不会破坏服务器上的资源；幂等：多次相同操作，结果不变 |

### HTTP（1.1）特性
#### 优缺点
* 优点：简单、灵活和易于扩展、应用广泛和跨平台
* 缺点：无状态、明文传输，不安全
   * 无状态：通过cookie解决
   * 不安全：用 HTTPS 的方式解决，也就是通过引入 SSL/TLS 层

#### 性能 —— 请求-应答
* 长连接
  * http1.0是短连接，1.1是长连接（对比保活机质）
* 管道网络传输（pipeline）
  * 可以发出多个请求，但会按顺序处理
* 队头阻塞
  * http2，http3主要是优化性能

### HTTP和HTTPS
* SSL：Secure Sockets Layer 
* TLS：Transport Layer Security

#### 区别
| 类别 | HTTP | HTTPS |
| --- | --- | --- | 
| 传输 | 明文传输 | 加密传输 |
| 建立过程 | 三次握手即可 | 三次握手后还需SSL/TLS握手 |
| 端口号 | 80 | 443 |
| 其他 | - | https需要向CA机构申请数字证书 |

#### HTTPS解决的问题
* **非对称加密**：生成公钥和私钥，公钥可以任意分发，私钥保密，对等解密
* **对称加密**：只是用一个密钥，运行速度快，密钥必须保密

| 问题 | HTTP | HTTPS | 说明 |
| --- | --- | --- | --- |
| 窃听风险 - 机密性 | 信息加密 | 混合加密 | 对称加密和非对称加密，通讯建立前利用非对称加密交换会话密钥，通讯过程中采用对称加密 |
| 篡改风险 - 完整性 | 校验机质 | 摘要算法 | 在发送明文之前会通过摘要算法算出明文的指纹 ，例如md5加密 |
| 冒充风险 - 辨识性 | 身份证书 | 服务器公钥放入到数字证书 | 数字证书的方式保证服务器公钥的身份，解决冒充的风险 |

#### HTTPS建立过程
* 握手阶段（四次通讯）
     * 客户端向服务器索要并验证服务器的公钥。
     * 双方协商生产「会话秘钥」。
* 双方采用「会话秘钥」进行加密通信
* 过程 
   | 过程 | client | server | 说明 |
   | --- | --- | --- | --- |
   | ClientHello | 发送支持的SSL/TLS支持的版本，生成的随机数，支持的密码套件列表 | - | 密码套件，比如RSA算法，非对称加密 |
   | ServerHello | - | 确认SSL/TLS版本，生成的随机数，确认密码套件列表，数字证书 | - |
   | 客户端回应 | 确认证书，取出公钥，报文公钥加密，生成新的随机数，加密改变通知，握手结束，记录摘要 | - | 各自生产会话密钥 |
   | 服务器回应 | - | 加密改变通知，记录摘要 | - | 根据三个随机数生成密钥 |

### HTTP演变
#### http1.0
* TCP短连接
* 缺点
   * 性能开销

#### http1.1
1. TCP长连接，改善性能开销
2. 支持管道网络传输，减少响应时间
缺点
   * 请求头不能压缩
   * 队头阻塞（串行请求）
   * 没有请求优先级控制
   * 请求是单向的，服务器被动接受

#### http2.0
1. 基于https协议，安全有保障，TLS1.2+
2. 头部压缩，消除重读
   * HPACK算法，生成索引
3. 二进制格式 —— 增加传输效率
4. 数据流
  * 客户端奇数，服务器偶数
  * 存在优先级
5. 多路复用
  * 一个连接中并发多个请求或回应
6. 服务器推送
  * 主动推送消息
缺点
  * 丢包后，TCP连接中的所有请求阻塞

#### http3.0
1. 协议UDP， QUIC 协议，减少握手次数为3次
2. TLS1.3+,头部压缩QPack
3. 不会阻塞


