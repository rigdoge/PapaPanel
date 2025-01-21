'use strict';

const ansibleService = require('../../../services/ansible');

/**
 * server controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::server.server', ({ strapi }) => ({
  async create(ctx) {
    // 创建服务器记录
    const response = await super.create(ctx);
    const server = response.data;

    try {
      // 如果是 web 服务器,安装 LEMP 环境
      if (server.attributes.server_type === 'web') {
        await ansibleService.installLemp(server.attributes);
      }
      // 如果是监控服务器,配置监控
      else if (server.attributes.server_type === 'monitor') {
        await ansibleService.setupMonitoring(server.attributes);
      }

      return response;
    } catch (error) {
      // 如果自动化配置失败,删除服务器记录
      await super.delete(ctx);
      ctx.throw(500, error.message);
    }
  },

  async update(ctx) {
    // 获取原始服务器信息
    const { id } = ctx.params;
    const originalServer = await strapi.entityService.findOne('api::server.server', id);

    // 更新服务器记录
    const response = await super.update(ctx);
    const server = response.data;

    try {
      // 如果服务器类型改变,重新配置环境
      if (originalServer.server_type !== server.attributes.server_type) {
        if (server.attributes.server_type === 'web') {
          await ansibleService.installLemp(server.attributes);
        }
        else if (server.attributes.server_type === 'monitor') {
          await ansibleService.setupMonitoring(server.attributes);
        }
      }

      return response;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }
})); 