const axios = require('axios');

class CloudflareAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = 'https://api.cloudflare.com/client/v4';
  }

  // 获取 Tunnel 列表
  async listTunnels() {
    const res = await axios.get(`${this.baseURL}/accounts/<ACCOUNT_ID>/cfd_tunnel`, {
      headers: { Authorization: `Bearer ${this.apiToken}` }
    });
    return res.data;
  }

  // 启动 / 停止 Tunnel
  async controlTunnel(tunnelId, action) {
    const res = await axios.post(
      `${this.baseURL}/accounts/<ACCOUNT_ID>/cfd_tunnel/${tunnelId}/${action}`,
      null,
      { headers: { Authorization: `Bearer ${this.apiToken}` } }
    );
    return res.data;
  }

  // 更多方法：配置更新、日志获取...
}

module.exports = CloudflareAPI;
