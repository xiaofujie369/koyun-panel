const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const CloudflareAPI = require('./cf-api');
require('dotenv').config();

const api = new CloudflareAPI(process.env.CF_API_TOKEN);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API：获取所有 Tunnel
app.get('/api/tunnels', async (req, res) => {
  try {
    const result = await api.listTunnels();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API：管理 Tunnel
app.post('/api/tunnel/:id/:action', async (req, res) => {
  try {
    const result = await api.controlTunnel(req.params.id, req.params.action);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动
app.listen(3000, () => {
  console.log(`KOYUN Panel running at http://localhost:3000`);
});
