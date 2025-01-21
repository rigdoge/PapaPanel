# 贡献指南

感谢您对 PapaPanel 项目的关注！我们欢迎任何形式的贡献。

## 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档修改
- `style`: 代码格式修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat(monitor): 添加 Grafana 告警规则
^--^ ^-----^  ^-------------------^
|    |        |
|    |        +-> 描述
|    +----------> 作用域
+---------------> 类型
```

## 代码风格

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 最佳实践

## 分支管理

- `main`: 主分支，用于发布
- `develop`: 开发分支
- `feature/*`: 特性分支
- `fix/*`: 修复分支
- `release/*`: 发布分支

## 发布流程

1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建发布标签
4. 合并到 main 分支

## 问题反馈

- 使用 GitHub Issues 提交问题
- 清晰描述问题和复现步骤
- 提供相关的日志和截图

## 安全问题

如果发现安全漏洞，请直接联系维护者，不要在 GitHub Issues 中公开讨论。 