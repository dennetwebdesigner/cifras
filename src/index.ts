import cors from 'cors';
import express, { Application } from 'express';
import http, { Server } from 'http';
import path from 'path';
import { Socket, Server as socketServer } from 'socket.io';

import CONNECTIONS from './connection';
import { _quit_room } from './functions/lobby/quit_room';
import { LOBBYS, LOBBYS_ROOMS } from './server/LobbyServer';

const port: number = parseInt(process.env.PORT!) || 3000;

const app: Application = express();
const server: Server = http.createServer(app);
const io = new socketServer(server, {
  cors: { origin: '*' },
});

// Config ====
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://cifras-o1jb.onrender.com;");
  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Realtime ====
io.on('connection', (socket: Socket) => {
  // =====================
  CONNECTIONS.forEach((connections: Function) => {
    connections(socket);
  });
  // =====================

  socket.on('disconnect', () => {
    _quit_room(socket);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/*sala', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
server.listen(port, () => {
  console.log('Servidor rodando em port: ' + port);
});
