const OriginalWebSocket = window.WebSocket;
const interceptedSockets: WebSocket[] = [];

function interceptSockets() {
    window.WebSocket = new Proxy(OriginalWebSocket, {
        construct(target, args) {
          console.log("Intercepting WebSocket connection to:", args[0]);
          const ws = new target(...(args as [string, ...any[]]));
      
          interceptedSockets.push(ws);
      
          ws.addEventListener("open", () => {
            console.log("WebSocket connection opened:", args[0]);
          });
      
          return ws;
        }
      });
}

const PacketType = {
  PLACE_BLOCK: "PLACE_BLOCK",
};

const packets = {
  [PacketType.PLACE_BLOCK]: {
    pos: null,
    toBlock: null,
    checker: null
  },
};

function sendPacket(packetType: any, data: any) {
  const packet = {
    type: packetType,
    payload: data,
  };

  const packetString = JSON.stringify(packet);

  interceptedSockets.forEach((ws: WebSocket) => {
      ws.send(packetString);
      console.log(`Sent packet: ${packetString} to WebSocket:`, ws.url);
  });
}

export {sendPacket, interceptSockets, PacketType}