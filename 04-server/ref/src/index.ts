import express from 'express';
import { createServer } from 'http';
import { addRoutes } from './routes';

var app = express();
addRoutes(app);
var server = createServer(app);

server.listen(3000)
.on("listening", ()=> console.log('listening on port 3000'))
.on("error", () => console.log('ran into some error'));
