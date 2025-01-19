# PapaPanel

基于 React Admin 的 LEMP 环境自动化部署和监控管理平台

## 项目概述

PapaPanel 是一个现代化的 LEMP (Linux, Nginx, MySQL, PHP) 环境管理平台，提供自动化部署、监控和管理功能。

### 主要特性

- 🚀 自动化部署 LEMP 环境
- 📊 实时监控和告警
- 🛡️ 安全管理和审计
- 🔄 自动备份和恢复
- 📱 响应式设计，支持移动端
- 🌐 多站点管理
- 🔍 日志聚合和分析
- 🎯 性能优化建议

### 技术栈

- 前端：React Admin
- 监控：Prometheus + Grafana + Alertmanager
- 自动化：Ansible + Terraform
- 环境：LEMP (Linux + Nginx + MySQL + PHP)

## 快速开始

### 前置条件

- Node.js >= 16
- Docker >= 20.10
- Terraform >= 1.0
- Ansible >= 2.9

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/TattooMaster/PapaPanel.git
cd PapaPanel
```

2. 安装依赖
```bash
npm install
```

3. 配置环境
```bash
cp .env.example .env
# 编辑 .env 文件设置必要的环境变量
```

4. 启动开发服务器
```bash
npm run dev
```

## 部署指南

详细的部署文档请参考 [部署指南](docs/deployment.md)

## 文档

- [用户指南](docs/user/README.md)
- [管理员指南](docs/admin/README.md)
- [开发指南](docs/developer/README.md)
- [API 文档](docs/api/README.md)

## 贡献指南

欢迎贡献代码，请参考 [贡献指南](CONTRIBUTING.md)

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件 