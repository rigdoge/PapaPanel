# 更新日志

所有重要的更改都会记录在这个文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [2.0.0] - 2024-03-19

### 变更
- 重构项目架构，使用 Strapi 作为后端框架
- 移除 React Admin，简化前端实现
- 优化监控系统架构

### 新增
- Strapi CMS 集成
- Ansible Playbooks 系统
- Prometheus + Alertmanager 监控告警
- Grafana 可视化
- Loki 日志管理

### 移除
- React Admin 相关代码
- 自定义认证系统
- 旧版监控组件 