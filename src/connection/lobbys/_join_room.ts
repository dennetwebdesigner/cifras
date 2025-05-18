import { Socket } from 'socket.io';

import { LOBBYS, LOBBYS_ROOMS } from '../../server/LobbyServer';

export async function _join_room(conn: Socket) {
  conn.on('lobby/join', (data: any) => {
    let lobby = null;
    const joinRoom = LOBBYS_ROOMS.findIndex((r) => r == data.code);
    if (joinRoom <= -1) {
      conn.emit('lobby/join-error', { message: 'Esta sala não existe' });
      console.log('error join');
      return;
    }
    lobby = LOBBYS[data.code];
    const member = { username: data.username, session: conn.id, room: lobby.room };
    lobby.members.push(member);
    conn.join(lobby.room);
    console.log('você entrou');
    const payloadMe = { members: lobby.members, code: data.code, room: lobby.room.split('-')[1] };
    conn.emit('lobby/joined', payloadMe);

    conn.to(lobby.room).emit('lobby/join', { ...member, room: payloadMe.room });
  });
}
