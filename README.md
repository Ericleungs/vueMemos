### alpha 0.27.1 patch
修正了一些CSS，准备对该项目重构。（即将停止维护，该项目之后更多倾向于试验品用途）

### alpha 0.27 patch
修复了编辑过程中，文字特效消失的问题

### alpha 0.26 patch
实现了选中子节点后，内容复制到现有的文本框上

### alpha 0.25 patch
实现了重命名机制和删除机制

### alpha 0.24 patch
实现了左侧列表的右键菜单，以及一部分的交互（此版本之后开始越来越需要bin.js作为中间媒介）

### alpha 0.23 patch
实现localStorage功能，着手实现右键菜单以及增删查改操作

### alpha 0.22 patch
修复选中绑定的字符过程中，多次绑定会致使先前失效的问题；暂停buffer功能的实现，转而投入其他功能中

### alpha 0.21 patch
开始植入撤回功能，以及键盘监听同步

# vue-memos
### 第一次尝试独立用Vue做一个便签页面
### 主要难点在于富文本编辑器的各种功能实现
#### 例如如何选中绑定，如何实现撤回，如何实现颜色设置等
##### 选中绑定（√） 撤回（实现中）
### 以及后台处理方式（目前还是考虑localStorage）

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
