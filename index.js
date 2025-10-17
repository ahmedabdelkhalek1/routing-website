const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const server = http.createServer(function(req, res) {
  // You could put logic here for custom routing or filtering
  proxy.web(req, res, { target: req.url });
});

let PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
