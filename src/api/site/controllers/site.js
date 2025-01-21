'use strict';

const ansibleService = require('../../../services/ansible');

/**
 * site controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::site.site', ({ strapi }) => ({
  async create(ctx) {
    // 创建站点记录
    const response = await super.create(ctx);
    const site = response.data;

    try {
      // 部署站点
      await ansibleService.deploySite(site.attributes);
      return response;
    } catch (error) {
      // 如果部署失败,删除站点记录
      await super.delete(ctx);
      ctx.throw(500, error.message);
    }
  },

  async update(ctx) {
    // 更新站点记录
    const response = await super.update(ctx);
    const site = response.data;

    try {
      // 重新部署站点
      await ansibleService.deploySite(site.attributes);
      return response;
    } catch (error) {
      ctx.throw(500, error.message);
    }
  }
})); 