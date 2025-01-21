# PapaPanel

基于 Strapi 的 LEMP 环境自动化部署和监控管理平台

## 功能特点

- 服务器管理
  - LEMP 环境自动部署
  - 站点配置管理
  - SSL 证书管理
  - 安全加固

- 监控告警
  - 系统指标监控
  - 服务状态监控
  - 多渠道告警通知
  - 日志聚合分析

- 自动化运维
  - Ansible Playbooks
  - 备份管理
  - 批量操作
  - 定时任务

## 技术栈

- 后端框架：Strapi 4.20.0
- 数据库：PostgreSQL
- 自动化：Ansible 2.16.2
- 监控系统：
  - Prometheus 2.49.0
  - Alertmanager 0.26.0
  - Grafana 10.2.3
  - Loki 2.9.0

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- PostgreSQL >= 15.0
- Docker >= 24.0.0
- Ansible >= 2.16.0

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

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填写必要的配置
```

4. 启动开发环境
```bash
docker-compose up -d
npm run develop
```

## 文档

- [架构设计](docs/architecture/overview.md)
- [数据库设计](docs/architecture/database.md)
- [部署指南](docs/architecture/deployment.md)
- [贡献指南](CONTRIBUTING.md)
- [更新日志](CHANGELOG.md)

## 许可证

MIT 