// index.js
const ProxyChain = require('proxy-chain');
const server = new ProxyChain.Server({
    port: process.env.PORT || 10000,
    // authentication: { username: 'user', password: 'pass' } // optional
});
server.listen(() => {
    console.log('Proxy server is listening');
});
