const socks = require('socksv5');

// Create SOCKS5 server
const server = socks.createServer(function(info, accept, deny) {
  console.log('Connection request:', info.dstAddr + ':' + info.dstPort);
  // Accept all connections
  accept();
});

// Use no authentication
server.useAuth(socks.auth.None());

const PORT = process.env.PORT || 1080;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, function() {
  console.log('SOCKS5 proxy server running on ' + HOST + ':' + PORT);
});

// Error handling
server.on('error', function(err) {
  console.error('Server error:', err);
});
