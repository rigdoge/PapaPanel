const { exec } = require('child_process');
const fs = require('fs/promises');
const yaml = require('js-yaml');
const path = require('path');

class AnsibleService {
  constructor() {
    this.inventoryPath = path.join(process.cwd(), 'ansible/inventory/hosts.yml');
    this.playbooksPath = path.join(process.cwd(), 'ansible/playbooks');
  }

  // 更新 inventory 文件
  async updateInventory(servers) {
    const inventory = {
      all: {
        children: {
          web_servers: { hosts: {} },
          db_servers: { hosts: {} },
          monitor_servers: { hosts: {} }
        },
        vars: {
          ansible_python_interpreter: '/usr/bin/python3',
          ansible_ssh_common_args: '-o StrictHostKeyChecking=no'
        }
      }
    };

    // 根据服务器类型分组
    for (const server of servers) {
      const group = `${server.server_type}_servers`;
      inventory.all.children[group].hosts[server.hostname] = {
        ansible_host: server.ip,
        ansible_port: server.ssh_port,
        ansible_ssh_private_key_file: server.ssh_key
      };
    }

    // 写入 inventory 文件
    await fs.writeFile(
      this.inventoryPath,
      yaml.dump(inventory),
      'utf8'
    );
  }

  // 执行 playbook
  async runPlaybook(playbookName, extraVars = {}) {
    const playbookPath = path.join(this.playbooksPath, `${playbookName}.yml`);
    
    // 构建 ansible-playbook 命令
    let command = `ansible-playbook -i ${this.inventoryPath} ${playbookPath}`;
    
    // 添加额外变量
    if (Object.keys(extraVars).length > 0) {
      const extraVarsJson = JSON.stringify(extraVars);
      command += ` --extra-vars '${extraVarsJson}'`;
    }

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });
  }

  // 安装 LEMP 环境
  async installLemp(server, phpVersion) {
    // 更新 inventory
    await this.updateInventory([server]);
    
    // 执行 LEMP playbook
    return this.runPlaybook('lemp', {
      php_version: phpVersion,
      mysql_root_password: 'changeme' // 应该从配置或环境变量中获取
    });
  }

  // 部署站点
  async deploySite(site) {
    // 获取关联的服务器信息
    const server = await strapi.entityService.findOne('api::server.server', site.server.id);
    
    // 更新 inventory
    await this.updateInventory([server]);
    
    // 执行站点部署 playbook
    return this.runPlaybook('site', {
      domain: site.domain,
      php_version: site.php_version,
      nginx_config: site.nginx_config
    });
  }

  // 配置监控
  async setupMonitoring(server) {
    // TODO: 实现监控配置逻辑
  }
}

module.exports = new AnsibleService(); 