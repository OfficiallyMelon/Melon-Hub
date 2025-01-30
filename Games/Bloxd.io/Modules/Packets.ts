// Declare hookedSend globally
let hookedSend: { apply: (arg0: PropertyDescriptor & ThisType<any>, arg1: any[]) => any } | null = null;
let Context : any = null;
function interceptSockets() {
  (function() {
    const originalDefineProperty = Object.defineProperty;
  
    // Hooking into the send property of window
    Object.defineProperty = function<T>(obj: T, prop: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): T {
        try {
          if (prop === "send" && typeof descriptor.value === "function") {
                console.log(`[HOOK] Defining property: send`);
  
                hookedSend = descriptor.value;
  
                descriptor.value = function(...args: any[]) {
                    //console.log(`[HOOK] Intercepted send() call with arguments:`, args);
                    if (hookedSend) {
                       Context = this;
                        return hookedSend.apply(this, args);
                    } else {
                        console.error(`[HOOK ERROR] hookedSend is null`);
                    }
                };
            }
        } catch (error) {
            console.error(`[HOOK ERROR] Failed to hook send:`, error);
        }
  
        return originalDefineProperty.apply(this, arguments as any) as T;
    };
  
    // Attach a getter to get hookedSend globally if needed
    Object.defineProperty(window, "getHookedSend", {
        value: () => hookedSend,
        writable: false,
        configurable: false
    });
  })();
}

// function PacketConverter(Y) {
//   const P = new Array(128).fill(0).map((_, index) => index);
//   const X = new s.e("$(Y)$(e.m)");

//   return function(Y: any[]) {
//       for (let P = 0; P < Y.length; P++) {
//           const q = P + Math.floor(X.next() * (Y.length - P));
//           [Y[P], Y[q]] = [Y[q], Y[P]];
//       }
//       return Y;
//   };
// }

const PacketType = {
  PLACE_BLOCK: 114,
};

const packets = {
  [PacketType.PLACE_BLOCK]: {
    pos: null,
    toBlock: null,
    checker: null
  },
};

function sendPacket(packetType: any, data: any) {
  if (hookedSend && Context) {
    hookedSend.apply(Context, [packetType, data]);
  } else {
    console.error(`[HOOK ERROR] hookedSend is null`);
  }
}

export { sendPacket, PacketType, interceptSockets };
