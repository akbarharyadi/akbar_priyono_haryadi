import app from './src/app';
import * as http from 'http';

const server: http.Server = http.createServer(app);
const port = 4000;

server.listen(port, () => {
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log('server is running!');
});

export default server