“子项目”对外输出不需要入口HTML页面，只需要输出的资源文件即可，资源文件包括js、css、fonts和imgs等。

“Portal项目”提供注册的接口，“子项目”进行注册，最终聚合成一个单页应用。在整套机制中，比较核心的部分是路由注册机制，“子项目”的路由应该由自己控制，而整个系统的导航是“Portal项目”提供的。