import { Socket } from 'socket.io';

import { LOBBYS, LOBBYS_ROOMS } from '../../server/LobbyServer';

export async function _create_room(conn: Socket) {
  conn.on('lobby/create', ({ name, username, session_guard }: { name: string; username: string; session_guard: string }) => {
    name.toLowerCase().split(' ').join('_');
    const hasRoomSession = LOBBYS_ROOMS.find((l) => l == session_guard);

    if (hasRoomSession) {
      conn.join(LOBBYS[hasRoomSession].room);
      console.log('Sessão ja existente - apenas entrou', hasRoomSession);
      const settings = LOBBYS[hasRoomSession].room.split('-');
      conn.emit('lobby/joined', { room: settings[1], code: settings[0] });
      conn.to(LOBBYS[hasRoomSession].room).emit('lobby/join', { members: LOBBYS[hasRoomSession].members });
      return;
    }

    LOBBYS[conn.id] = {
      room: conn.id + '-' + name,
      members: [{ session: conn.id, username, room: name }],
    };

    LOBBYS_ROOMS.push(conn.id);
    conn.join(LOBBYS[conn.id].room);
    conn.emit('lobby/created', { code: conn.id, members: LOBBYS[conn.id].members });
  });
}
