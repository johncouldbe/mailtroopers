export const CONNECT_SOCKET = 'CONNECT_SOCKET'
export const connectSocket = socket => ({
  type: CONNECT_SOCKET,
  socket
})
