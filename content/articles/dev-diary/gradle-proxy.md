---
title: gradle 配置 http/https 代理
date: 2021-02-11
keyWords: gradle, proxy
series: Java项目开发笔记
---

## 问题

有些包很难下，比如说 forge。这个时候可以用 https 代理。

## 解决方案

在 `settings.gradle` 里面添加

```groovy
#代理服务器IP/域名

systemProp.http.proxyHost=127.0.0.1
systemProp.https.proxyHost=127.0.0.1

#代理服务器端口

systemProp.http.proxyPort=8080
systemProp.https.proxyPort=8080

#代理服务器需要验证时，填写用户名

systemProp.http.proxyUser=userid
systemProp.https.proxyUser=userid

#代理服务器需要验证时，填写密码

systemProp.http.proxyPassword=password
systemProp.https.proxyPassword=password

#不需要代理的域名/IP

systemProp.http.nonProxyHosts=*.nonproxyrepos.com|localhost
systemProp.https.nonProxyHosts=*.nonproxyrepos.com|localhost

```
