# 安全
* 参考[关于前端安全的 13 个提示](https://cloud.tencent.com/developer/article/1627385)

## CSRF攻击
* Cross-site request forgery —— 跨站请求伪造
* 恶意网站利用目标站点对浏览器的信任进行伪造请求
* 防御
   * 检查referer字段
   * 同步表单CSRF校验
   * 双重cookie防御，X-CSRF-TOKEN

## XSS攻击 
* Cross-site scripting —— 跨站脚本攻击
* 获取敏感信息cookies、sessionid等

## 措施
1. 将用户输入的innerHTML变成innerText
2. 内容安全策略CSP，Content-Security-Policy
3. 禁用iframe嵌入，"X-Frame-Options"："DENY"
4. 使用验证码
5. 避免将敏感信息存入storage中