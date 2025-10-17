const ProxyChain = require('proxy-chain');

const server = new ProxyChain.Server({
    port: process.env.PORT || 10000
});

server.listen(() => {
    console.log('Proxy server is listening on port ' + server.port);
});
