const { SocksProxyAgent } = require('socks-proxy-agent');
const net = require('net');
const Socks5Server = require('socksv5');

// Create SOCKS5 server
const server = Socks5Server.createServer((info, accept, deny) => {
  // Accept connections
  accept();
});

const PORT = process.env.PORT || 1080;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`SOCKS5 proxy server running on ${HOST}:${PORT}`);
});

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
