import { addOutput } from "../UI/UI";

interface Config {
    coordinates: [number | null, number | null, number | null];
    methods: Record<string, unknown>;
    hookedObject?: any;
    injectFunctionality?: boolean;
    babylonEngine?: any;
    noaInstance?: any;
    genericPlayerState?: any;
    CurrentlyInjected: boolean;
    freecamPosition: [x: number, y: number, z: number];
}

const config: Config = {
    coordinates: [null, null, null],
    methods: {},
    CurrentlyInjected: false,
    freecamPosition: [0,0,0]
};

// Functions
function hookObjectAssign(target: any, prop: string, handler: (...args: any[]) => void) {
    const originalMethod = target[prop];
    target[prop] = new Proxy(originalMethod, {
        apply: function(originalFunc, thisArg, argsList) {
            handler(...argsList);
            return Reflect.apply(originalFunc, thisArg, argsList);
        }
    });
}

// Hook Noa (thanks blackhole for injection method, yay!)
hookObjectAssign(Object, 'assign', function(...params: any[]) {
    let hasSwingTime = false;
    try {
        if (params[2].swingDuration !== undefined) {
            hasSwingTime = true;
        }
    } catch (err) {
        // Property swingDuration not found
    }

    let hasIdentifier = false;
    try {
        if (params[1].__id !== undefined) {
            hasIdentifier = true;
        }
    } catch (err) {
        // Property __id not found
    }

    if (hasSwingTime && hasIdentifier && params.length === 4 && params[2].swingDuration === 200 && params[1].__id === 1) {
        config.hookedObject = params[0];
        setTimeout(function() {
            config.babylonEngine = (window as any).BABYLON;
            config.noaInstance = config.hookedObject.heldItem.noa;
            config.CurrentlyInjected = true;
            addOutput("Injection State:", config.noaInstance ? "Successfully hooked noa!" : "Unsuccessful, try reloading the page.");
            console.log("Successfully hooked noa!", config.noaInstance);
            config.genericPlayerState = config.noaInstance.ents._storage.genericLifeForm.hash[config.noaInstance.playerEntity];
        }, 1);
    }
});

export { config };
