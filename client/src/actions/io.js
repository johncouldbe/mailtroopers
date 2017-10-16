export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const connectSocket = socket => ({
  type: CONNECT_SOCKET,
  socket
})

export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET'
export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET
})
