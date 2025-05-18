import { Socket } from 'socket.io';

import { LOBBYS } from '../../server/LobbyServer';

export async function _quit_room(conn: Socket) {
  for (let room in LOBBYS) {
    const members = LOBBYS[room]?.members;
    if (!members) return;

    // Encontrar o índice do membro desconectado
    const index = members.findIndex((m: Record<string, any>) => m.session === conn.id);
    if (index === -1) return;

    const descon_member = members[index];

    // Remover o usuário da sala
    const roomName = `${room}-${descon_member.room}`;
    conn.leave(roomName);

    // Remover da lista de membros
    members.splice(index, 1);
  }
}
