const { exec } = require('child_process');
const fs = require('fs/promises');
const yaml = require('js-yaml');
const path = require('path');

class AnsibleService {
  constructor() {
    this.inventoryPath = path.join(process.cwd(), 'ansible/inventory/hosts.yml');
    this.playbooksPath = path.join(process.cwd(), 'ansible/playbooks');
  }

  // 检查本机状态
  async checkLocalStatus() {
    const services = {
      nginx: false,
      mysql: false,
      php_fpm: false,
      prometheus: false,
      alertmanager: false,
      grafana: false,
      loki: false
    };

    // 检查每个服务的状态
    for (const service of Object.keys(services)) {
      try {
        await this.execCommand(`systemctl is-active ${service}`);
        services[service] = true;
      } catch (error) {
        // 服务未运行或未安装
        services[service] = false;
      }
    }

    return {
      hostname: 'localhost',
      ip: '127.0.0.1',
      services
    };
  }

  // 执行命令的辅助方法
  async execCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout.trim());
      });
    });
  }

  // 更新 inventory 文件
  async updateInventory(servers) {
    const inventory = {
      all: {
        hosts: {
          localhost: {
            ansible_connection: 'local'
          }
        }
      }
    };

    if (servers) {
      // 添加远程服务器
      for (const server of servers) {
        if (!server.is_local) {
          inventory.all.hosts[server.hostname] = {
            ansible_host: server.ip,
            ansible_port: server.ssh_port,
            ansible_ssh_private_key_file: server.ssh_key
          };
        }
      }
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

    return this.execCommand(command);
  }

  // 安装 LEMP 环境
  async installLemp(phpVersion = '8.2') {
    // 更新 inventory
    await this.updateInventory();
    
    // 执行 LEMP playbook
    return this.runPlaybook('lemp', {
      php_version: phpVersion,
      mysql_root_password: 'changeme' // 应该从配置或环境变量中获取
    });
  }

  // 部署站点
  async deploySite(site) {
    // 更新 inventory
    await this.updateInventory();
    
    // 执行站点部署 playbook
    return this.runPlaybook('site', {
      domain: site.domain,
      php_version: site.php_version,
      nginx_config: site.nginx_config
    });
  }

  // 配置监控
  async setupMonitoring(monitor) {
    // 更新 inventory
    await this.updateInventory();
    
    // 执行监控配置 playbook
    return this.runPlaybook('monitor', {
      type: monitor.type,
      endpoint: monitor.endpoint
    });
  }
}

module.exports = new AnsibleService(); 