## 项目简介
练习白板项目，实现一个canvas画板，我们可以在上面随意的画画，添加矩形 圆形等物体并且可以放大缩小 旋转。可以添加图片和背景图。
未来朝着哪些方向去做可以在issues中进行讨论（流程图？ 涂鸦板？ 海报？ 时间轴故事块？等等。。。），目前可以先把基础的设施功能完善起来

## 项目启动
首先需要node版本 > 18 安装pnpm
```bash
npm install -g pnpm
```
克隆项目到本地后安装依赖
```bash
pnpm install
```
项目启动
```bash
pnpm run dev
```
写完代码后提交代码执行eslint检查修复
```bash
pnpm run lint:fix
```
## 项目结构
composables文件夹放置的是项目中的逻辑代码，这里面的代码都是可复用的
lib文件夹放的是项目中关于canvas那块的核心代码逻辑。
services文件夹放一些前端本地要用的数据。
store文件夹放置的是项目中的状态管理代码，当组件中的数据需要共享的时候，就可以放在这里。

## 参与方式
1. fork项目到自己的仓库
2. 克隆项目到本地
3. 创建自己的分支
4. 提交代码
5. 提交pr

目前项目处于初始开发阶段，如果你有兴趣参与项目的开发，可以在issue中提出你的想法或者根据todolist来建立issue任务，建完任务后自己提交pr去完成。这里的建议是提交pr之前先在issue中提出你的想法，然后将你的pr和issue链接起来，如果您能写些测试用例那就更好了～

### 已完成
1. canvas基础画板
2. tools工具栏css样式以及布局
3. canvas基础类
4. fabricObject物体类
5. rect矩形类
6. 在canvas画板添加添加矩形，添加的位置以当前窗口的中心四周一些位置


### TODO
1. 实现circle类（画圆）， 实现画笔简单的涂鸦， 橡皮擦功能
2. 通过canvas isPointInPath实现点击选中物体的功能，同时鼠标滑过的空间也可以多选物体
3. canvas上物体的拖拽，缩放，旋转
4. 整个画板的放大缩小，拖拽移动
5. 对每一步操作后，都实现撤销，恢复的功能
6. canvas画板网格线
