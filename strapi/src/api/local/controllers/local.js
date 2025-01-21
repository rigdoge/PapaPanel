'use strict';

const ansibleService = require('../../../services/ansible');

module.exports = {
  // 获取本机状态
  async status(ctx) {
    try {
      // 执行本机状态检查
      const result = await ansibleService.checkLocalStatus();
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  // 安装 LEMP 环境
  async installLemp(ctx) {
    try {
      const { php_version = '8.2' } = ctx.request.body;
      const result = await ansibleService.installLemp(php_version);
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  // 安装监控栈
  async setupMonitoring(ctx) {
    try {
      const result = await ansibleService.setupMonitoring({
        type: 'monitor',
        endpoint: 'localhost'
      });
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  // 部署站点
  async deploySite(ctx) {
    try {
      const site = ctx.request.body;
      const result = await ansibleService.deploySite({
        ...site,
        server: { hostname: 'localhost' }
      });
      ctx.body = result;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }
}; 