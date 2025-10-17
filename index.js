const socks = require('socks');
const net = require('net');

const PORT = process.env.PORT || 10000;

const server = net.createServer((socket) => {
    socket.once('data', (data) => {
        // Simple SOCKS5 handler
        if (data[0] === 5) {
            socket.write(Buffer.from([5, 0]));
            socket.once('data', (data) => {
                const cmd = data[1];
                const atyp = data[3];
                
                if (cmd === 1) { // CONNECT
                    let host, port, offset;
                    
                    if (atyp === 1) { // IPv4
                        host = `${data[4]}.${data[5]}.${data[6]}.${data[7]}`;
                        port = data.readUInt16BE(8);
                        offset = 10;
                    } else if (atyp === 3) { // Domain
                        const len = data[4];
                        host = data.slice(5, 5 + len).toString();
                        port = data.readUInt16BE(5 + len);
                        offset = 5 + len + 2;
                    }
                    
                    const remote = net.connect(port, host, () => {
                        socket.write(Buffer.from([5, 0, 0, 1, 0, 0, 0, 0, 0, 0]));
                        socket.pipe(remote);
                        remote.pipe(socket);
                    });
                    
                    remote.on('error', () => socket.end());
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`SOCKS5 proxy listening on port ${PORT}`);
});
