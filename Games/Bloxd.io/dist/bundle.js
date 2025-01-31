/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  n9: () => (/* binding */ addOutput),
  oP: () => (/* binding */ injectionStatus)
});

// UNUSED EXPORTS: addError, reapplyLogs

;// ./Inject/Inject.ts

var config = {
    coordinates: [null, null, null],
    methods: {},
    CurrentlyInjected: false,
    freecamPosition: [0, 0, 0]
};
// Functions
function hookObjectAssign(target, prop, handler) {
    var originalMethod = target[prop];
    target[prop] = new Proxy(originalMethod, {
        apply: function (originalFunc, thisArg, argsList) {
            handler.apply(void 0, argsList);
            return Reflect.apply(originalFunc, thisArg, argsList);
        }
    });
}
// Hook Noa (thanks blackhole for injection method, yay!)
hookObjectAssign(Object, 'assign', function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var hasSwingTime = false;
    try {
        if (params[2].swingDuration !== undefined) {
            hasSwingTime = true;
        }
    }
    catch (err) {
        // Property swingDuration not found
    }
    var hasIdentifier = false;
    try {
        if (params[1].__id !== undefined) {
            hasIdentifier = true;
        }
    }
    catch (err) {
        // Property __id not found
    }
    if (hasSwingTime && hasIdentifier && params.length === 4 && params[2].swingDuration === 200 && params[1].__id === 1) {
        config.hookedObject = params[0];
        setTimeout(function () {
            config.babylonEngine = window.BABYLON;
            config.noaInstance = config.hookedObject.heldItem.noa;
            config.CurrentlyInjected = true;
            addOutput("Injection State:", config.noaInstance ? "Successfully hooked noa!" : "Unsuccessful, try reloading the page.");
            console.log("Successfully hooked noa!", config.noaInstance);
            window.noa = config.noaInstance;
            config.genericPlayerState = config.noaInstance.ents._storage.genericLifeForm.hash[config.noaInstance.playerEntity];
            setTimeout(function () {
                injectionStatus.style.cssText =
                    "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:green;border-radius:50%;";
            }, 100);
        }, 1);
    }
});


;// ./Modules/Packets.ts
var _a;
// Declare hookedSend globally
var hookedSend = null;
var Context = null;
function interceptSockets() {
    (function () {
        var originalDefineProperty = Object.defineProperty;
        // Hooking into the send property of window
        Object.defineProperty = function (obj, prop, descriptor) {
            try {
                if (prop === "send" && typeof descriptor.value === "function") {
                    console.log("[HOOK] Defining property: send");
                    hookedSend = descriptor.value;
                    descriptor.value = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        //console.log(`[HOOK] Intercepted send() call with arguments:`, args);
                        if (hookedSend) {
                            Context = this;
                            return hookedSend.apply(this, args);
                        }
                        else {
                            console.error("[HOOK ERROR] hookedSend is null");
                        }
                    };
                }
            }
            catch (error) {
                console.error("[HOOK ERROR] Failed to hook send:", error);
            }
            return originalDefineProperty.apply(this, arguments);
        };
        // Attach a getter to get hookedSend globally if needed
        Object.defineProperty(window, "getHookedSend", {
            value: function () { return hookedSend; },
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
var PacketType = {
    PLACE_BLOCK: 114,
};
var packets = (_a = {},
    _a[PacketType.PLACE_BLOCK] = {
        pos: null,
        toBlock: null,
        checker: null
    },
    _a);
function sendPacket(packetType, data) {
    if (hookedSend && Context) {
        hookedSend.apply(Context, [packetType, data]);
    }
    else {
        console.error("[HOOK ERROR] hookedSend is null");
    }
}


;// ./Modules/Modules.ts
// Modules.ts



var ExecutionFunctions = /** @class */ (function () {
    function ExecutionFunctions() {
    }
    ExecutionFunctions.prototype.simulateLeftClick = function (element) {
        var mouseDownEvent = new MouseEvent("mousedown", {
            button: 0,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseDownEvent);
        var mouseUpEvent = new MouseEvent("mouseup", {
            button: 0,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseUpEvent);
    };
    ExecutionFunctions.prototype.simulateRightClick = function (element) {
        var mouseDownEvent = new MouseEvent("mousedown", {
            button: 2,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseDownEvent);
        var mouseUpEvent = new MouseEvent("mouseup", {
            button: 2,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseUpEvent);
    };
    ExecutionFunctions.prototype.distanceBetween = function (point1, point2) {
        var dx = point2[0] - point1[0];
        var dy = point2[1] - point1[1];
        var dz = point2[2] - point1[2];
        return dx * dx + dy * dy + dz * dz;
    };
    ExecutionFunctions.prototype.distanceBetweenSqrt = function (point1, point2) {
        return Math.sqrt(this.distanceBetween(point1, point2));
    };
    ExecutionFunctions.prototype.ChangeCrouchSpeed = function (speed) {
        config.noaInstance.serverSettings.crouchingSpeed = speed;
    };
    ExecutionFunctions.prototype.ChangeWalkSpeed = function (speed) {
        config.noaInstance.serverSettings.walkingSpeed = speed;
    };
    ExecutionFunctions.prototype.InstantRespawn = function () {
        var _a;
        if (config.noaInstance) {
            config.noaInstance.serverSettings.secsToRespawn = 0;
            (_a = document.querySelector(".NewButton.BlueButton.RespawnButton")) === null || _a === void 0 ? void 0 : _a.click();
        }
    };
    ExecutionFunctions.prototype.normalizeVector = function (vector) {
        var magnitude = vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2];
        if (magnitude > 0) {
            var invMagnitude = 1 / Math.sqrt(magnitude);
            return [vector[0] * invMagnitude, vector[1] * invMagnitude, vector[2] * invMagnitude];
        }
        return vector;
    };
    ExecutionFunctions.prototype.killaura = function (range) {
        var targets = getAttackablePlayers();
        if (targets.length === 0) {
            addOutput("No targets found");
            return;
        }
        var nearestTarget = getNearestTarget(targets);
        var playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
        var targetPosition = config.noaInstance.ents.getPositionData(nearestTarget).position;
        if (Utilities.distanceBetweenSqrt(playerPosition, targetPosition) <= 5) {
            var originalDirection = config.noaInstance.camera._dirVector;
            config.noaInstance.camera._dirVector = Utilities.normalizeVector([
                targetPosition[0] - playerPosition[0],
                targetPosition[1] - playerPosition[1],
                targetPosition[2] - playerPosition[2]
            ]);
            var canvasElement = document.querySelector("#noa-canvas");
            if (canvasElement) {
                this.simulateLeftClick(canvasElement);
            }
            config.noaInstance.camera._dirVector = originalDirection;
        }
    };
    ExecutionFunctions.prototype.removeAllCookies = function () {
        var cookies = document.cookie.split(";");
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            var eqPos = cookie.indexOf("=");
            var name_1 = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name_1 + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    };
    return ExecutionFunctions;
}());
function getAllPlayers() {
    var _a = config.noaInstance, playerNames = _a.playerNames, playerEntity = _a.playerEntity, ents = _a.ents;
    var playerIds = [];
    for (var key in playerNames) {
        if (playerNames.hasOwnProperty(key)) {
            var id = Number(key);
            if (id !== playerEntity && ents.hasComponent(id, "position") && ents.hasComponent(id, 'genericLifeformState') && ents.genericLifeformState(id).isAlive) {
                playerIds.push(id);
            }
        }
    }
    return playerIds;
}
function getAttackablePlayers() {
    return getAllPlayers().filter(function (id) { var _a; return (_a = config.noaInstance.otherPlayerSettings[config.noaInstance.playerEntity][id]) === null || _a === void 0 ? void 0 : _a.canAttack; });
}
function getNearestTarget(targets) {
    var playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
    var nearestTarget = undefined;
    var nearestDistance = Infinity;
    for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
        var target = targets_1[_i];
        var distance = Utilities.distanceBetween(playerPosition, config.noaInstance.ents.getPosition(target));
        if (nearestTarget === undefined || distance < nearestDistance) {
            nearestTarget = target;
            nearestDistance = distance;
        }
    }
    return nearestTarget;
}
var AimbotStatus = false;
var Utilities = new ExecutionFunctions();
var Exploits = [
    {
        type: "Combat",
        title: "Kill Aura",
        desc: "Detects and attacks nearby entities (BROKEN)",
        pertick: function (state) {
            if (state) {
                Utilities.killaura(30);
            }
        },
    },
    {
        type: "Combat",
        title: "Auto Clicker",
        desc: "Automatically clicks for you",
        pertick: function () {
            if (config.CurrentlyInjected && config.noaInstance) {
                var element = document.querySelector("#noa-canvas");
                if (element) {
                    element.dispatchEvent(new MouseEvent("mousedown", { button: 0, bubbles: true, cancelable: true }));
                    element.dispatchEvent(new MouseEvent("mouseup", { button: 0, bubbles: true, cancelable: true }));
                }
            }
        },
    },
    {
        type: "Combat",
        title: "Anti Shake",
        desc: "Disables camera shake on hit",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    config.noaInstance.entities.getState(config.noaInstance.playerEntity, "cameraShake").shakePower = 0;
                }
            }
        }
    },
    {
        type: "Player",
        title: "Scaffold",
        desc: "Automatically places blocks under you. (BROKEN)",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    var player = config.noaInstance.playerEntity;
                    var position = config.noaInstance.ents.getPosition(player);
                    var block = config.noaInstance.getBlock(position[0], position[1] - 1, position[2]);
                    var f = config.noaInstance.ents.getInventoryState(config.noaInstance.playerEntity).selectedItem;
                    var ObjID = f && ("CubeBlock" === f.typeObj.type || "TwoDBlock" === f.typeObj.type || "SlabBlock" === f.typeObj.type) ? f.typeObj.id : null;
                    if (block === 0) {
                        var roundedPosition = [
                            Math.floor(position[0]),
                            Math.floor(position[1] - 1),
                            Math.floor(position[2])
                        ];
                        addOutput("Placing block at", roundedPosition.toString());
                        addOutput("Block ID", block);
                        if (ObjID) {
                            sendPacket(PacketType.PLACE_BLOCK, {
                                pos: roundedPosition,
                                toBlock: ObjID,
                                checker: ''
                            });
                            config.noaInstance.setBlock(roundedPosition[0], roundedPosition[1], roundedPosition[2], ObjID);
                        }
                    }
                }
            }
        },
    },
    {
        type: "Player",
        title: "Instant Respawn",
        desc: "Instantly respawns you when you die.",
        pertick: function () {
            if (config.CurrentlyInjected && config.noaInstance) {
                Utilities.InstantRespawn();
            }
        },
    },
    {
        type: "Combat",
        title: "Auto Trigger",
        desc: "Auto trigger for Aimbot (BROKEN)",
        pertick: function (state) {
            if (state && AimbotStatus) {
                var element = document.querySelector("#noa-canvas");
                if (element) {
                    element.dispatchEvent(new MouseEvent("mousedown", { button: 0, bubbles: true, cancelable: true }));
                    element.dispatchEvent(new MouseEvent("mouseup", { button: 0, bubbles: true, cancelable: true }));
                }
            }
        }
    },
    {
        type: "Player",
        title: "Account Gen",
        desc: "Generates accounts for you to use. (Requires Refresh)",
        pertick: function () {
            Utilities.removeAllCookies();
            location.reload();
        },
    },
    {
        type: "Combat",
        title: "Aimbot",
        desc: "Automatically aims at the nearest player.",
        pertick: function (state) {
            function normalizeVector(vector) {
                var magnitude = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2));
                if (magnitude === 0) {
                    return [0, 0, 0];
                }
                return vector.map(function (component) { return component / magnitude; });
            }
            function setDir(facing) {
                var heading = Math.atan2(facing[0], facing[2]);
                var pitch = Math.asin(-facing[1]);
                config.noaInstance.camera.heading = heading;
                config.noaInstance.camera.pitch = pitch;
                //cam(heading, pitch);
            }
            function calculateDistance(pos1, pos2) {
                var dx = pos2.x - pos1.x;
                var dy = pos2.y - pos1.y;
                var dz = pos2.z - pos1.z;
                return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));
            }
            if (state) {
                var cPlayer_1 = null;
                var cDist_1 = Infinity;
                config.noaInstance.entities._storage.position.list.forEach(function (p) {
                    if (typeof p.__id !== "number" && p.__id != 1 && p.__id !== config.noaInstance.serverPlayerEntity) {
                        console.log(p.__id);
                        var lifeformState = config.noaInstance.entities.getGenericLifeformState(p.__id);
                        if (lifeformState && lifeformState.isAlive) {
                            var myPos = config.noaInstance.entities.getPosition(1);
                            var enemyPos = p.position;
                            var myPosObj = {
                                x: myPos[0],
                                y: myPos[1],
                                z: myPos[2]
                            };
                            var enemyPosObj = {
                                x: enemyPos[0],
                                y: enemyPos[1],
                                z: enemyPos[2]
                            };
                            if (myPos[0] === enemyPos[0] && myPos[1] === enemyPos[1] && myPos[2] === enemyPos[2]) {
                                return;
                            }
                            var distance = calculateDistance(myPosObj, enemyPosObj);
                            if (distance < cDist_1) {
                                cDist_1 = distance;
                                cPlayer_1 = enemyPos;
                            }
                        }
                    }
                });
                if (cPlayer_1 && cDist_1 <= 20) {
                    var myPos = config.noaInstance.entities.getPosition(1);
                    var dirVec = [cPlayer_1[0] - myPos[0], cPlayer_1[1] - myPos[1], cPlayer_1[2] - myPos[2]];
                    var normVec = normalizeVector(dirVec);
                    setDir(normVec);
                }
                AimbotStatus = true;
            }
            AimbotStatus = false;
        }
    },
    {
        type: "Movement",
        title: "Auto Sprint",
        desc: "Automatically sprints when moving.",
        pertick: function () {
            if (config.CurrentlyInjected && config.noaInstance) {
                Utilities.ChangeWalkSpeed(config.noaInstance.serverSettings.runningSpeed);
            }
        },
    },
    {
        type: "Movement",
        title: "Fast Crouch",
        desc: "Increase crouching speed.",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeCrouchSpeed(config.noaInstance.serverSettings.runningSpeed);
                }
            }
            else {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeCrouchSpeed(2);
                }
            }
        },
    },
    {
        type: "Movement",
        title: "Auto Speed",
        desc: "Increase walking speed.",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeWalkSpeed(7.4);
                }
            }
            else {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeWalkSpeed(4.5);
                }
            }
        },
    },
    {
        type: "Movement",
        title: "Infinite Jump",
        desc: "Jump infinitely. (only works going up blocks)",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    config.noaInstance.serverSettings.airJumpCount = Infinity;
                }
            }
            else {
                if (config.CurrentlyInjected && config.noaInstance) {
                    config.noaInstance.serverSettings.airJumpCount = 0;
                }
            }
        },
    },
    {
        type: "Exploit",
        title: "Spider (VERY EXPERIMENTAL)",
        desc: "Climb walls.",
        pertick: function (status) {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    var noa = config.noaInstance;
                    var player = noa.playerEntity;
                    var position = noa.ents.getPosition(player); // [x, y, z]
                    var x = position[0];
                    var y = position[1];
                    var z = position[2];
                    var blockInFront = noa.getBlock(x, y, z + 1);
                    if (blockInFront !== 0) {
                        noa.ents.getPhysicsBody(player).applyImpulse([0, noa.serverSettings.jumpAmount * 0.08, 0]);
                    }
                }
            }
        },
    },
    {
        type: "Settings",
        title: "Soon",
        desc: "Coming soon",
        pertick: function () {
        },
    },
];


;// ./Saves/Save.ts
var SaveManager = /** @class */ (function () {
    function SaveManager() {
    }
    SaveManager.saveBoolean = function (key, value, overwrite) {
        if (overwrite === void 0) { overwrite = true; }
        if (overwrite || localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
    SaveManager.importBoolean = function (key) {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : false;
    };
    SaveManager.saveString = function (key, value) {
        localStorage.setItem(key, value);
    };
    SaveManager.importString = function (key) {
        return localStorage.getItem(key);
    };
    SaveManager.saveObject = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    SaveManager.importObject = function (key) {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };
    return SaveManager;
}());


;// ./UI/UI.ts
// Imports



// UI
var UI_link = document.createElement('link');
UI_link.rel = 'stylesheet';
UI_link.href = 'https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500&display=swap';
var UI_frame = document.createElement('div');
UI_frame.style.cssText = 'position:fixed;top:10px;right:10px;width:697.5px;height:448.5px;background-color:transparent;border-radius:10px;overflow:hidden;z-index:2147483646';
var rightImage = document.createElement('img');
rightImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMelon.png?raw=true';
rightImage.style.cssText = 'width:697.5px;height:448.5px';
rightImage.style.position = 'relative';
var leftImage = document.createElement('img');
leftImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMelon.png?raw=true';
leftImage.style.cssText = 'position:fixed;top:10px;right:495px;width:217.5px;height:448.5px;z-index:2147483646';
var melonHubText = document.createElement('div');
melonHubText.innerText = 'Melon Hub';
melonHubText.style.cssText = 'position:absolute; top: 20px; left: 34px; font-family: Inter, sans-serif; font-size: 22px; font-weight: 500; color: white; z-index: 2147483647;';
var versionText = document.createElement('div');
versionText.innerText = '1.0';
versionText.style.cssText = 'position:absolute; top: 20px; left: 145px; font-family: Inter, sans-serif; font-size: 14px; font-weight: 300; color: white; z-index: 2147483647;';
var buttonContainer = document.createElement('div');
buttonContainer.style.cssText = 'position:absolute;top:60px;left:-25px;width:217.5px;height:448.5px;z-index:2147483651;';
var rightButtonContainer = document.createElement('div');
rightButtonContainer.id = 'rightButtonContainer';
rightButtonContainer.style.cssText = 'position: absolute; top: 50px; right: 10px; width: 470px; height: 380px; z-index: 2147483649; overflow-y: auto; overflow-x: hidden; padding-right: 10px; box-sizing: border-box;';
var miniConsole = document.createElement('div');
miniConsole.id = 'miniConsole';
miniConsole.style.cssText = 'position: absolute; top: 40px; right: 5px; width: 470px; height: 380px; background-color: black; color: green; overflow-y: auto; padding: 10px; box-sizing: border-box; font-family: monospace; font-size: 14px; border: 2px solid gray; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: none; z-index: 20000000000;';
var injectionStatus = document.createElement("div");
injectionStatus.id = 'injectionStatus';
injectionStatus.style.cssText =
    "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;";
// Create UI
document.head.appendChild(UI_link); // frame
UI_frame.appendChild(rightImage); // frame
UI_frame.appendChild(leftImage); // frame
UI_frame.appendChild(melonHubText); // title
UI_frame.appendChild(versionText); // version
UI_frame.appendChild(buttonContainer); // buttons
UI_frame.appendChild(rightButtonContainer); // right buttons
UI_frame.appendChild(miniConsole); // debug console
UI_frame.appendChild(injectionStatus); // injection status
document.body.appendChild(UI_frame);
// Intercept Sockets
interceptSockets();
// Debug Console
var logs = [];
function addOutput() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var text = args.join(' ');
    var output = document.createElement('div');
    output.textContent = "> ".concat(text);
    output.style.color = 'green';
    output.style.marginBottom = '5px';
    miniConsole.appendChild(output);
    miniConsole.scrollTop = miniConsole.scrollHeight;
    logs.push({ text: text, type: 'output' });
}
function addError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var text = args.join(' ');
    var output = document.createElement('div');
    output.textContent = "> ".concat(text);
    output.style.color = 'red';
    output.style.marginBottom = '5px';
    miniConsole.appendChild(output);
    miniConsole.scrollTop = miniConsole.scrollHeight;
    logs.push({ text: text, type: 'error' });
}
function reapplyLogs() {
    miniConsole.innerHTML = '';
    logs.forEach(function (log) {
        if (log.type === 'output') {
            addOutput(log.text);
        }
        else if (log.type === 'error') {
            addError(log.text);
        }
    });
}
// Dragging
var isDragging = false;
var offsetX = 0;
var offsetY = 0;
UI_frame.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - UI_frame.getBoundingClientRect().left;
    offsetY = e.clientY - UI_frame.getBoundingClientRect().top;
    UI_frame.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        var newLeft = "".concat(e.clientX - offsetX, "px");
        var newTop = "".concat(e.clientY - offsetY, "px");
        UI_frame.style.left = newLeft;
        UI_frame.style.top = newTop;
        leftImage.style.left = "".concat(e.clientX - offsetX, "px");
        leftImage.style.top = "".concat(e.clientY - offsetY, "px");
    }
});
document.addEventListener('mouseup', function () {
    isDragging = false;
    UI_frame.style.cursor = 'default';
});
// Functions
var buttonStateTable = {};
function createRightButton(title, secondTitle, additionalInfo, onClick) {
    var btn = document.createElement("div");
    btn.style.cssText = "\n  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n";
    btn.onmouseenter = function () { return (btn.style.transform = "scaleY(1.05)"); };
    btn.onmouseleave = function () { return (btn.style.transform = "scaleY(1)"); };
    var titleContainer = document.createElement("div");
    titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
    btn.appendChild(titleContainer);
    var titleText = document.createElement("div");
    titleText.innerText = title;
    titleText.style.cssText =
        "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
    titleContainer.appendChild(titleText);
    var secondTitleText = document.createElement("div");
    secondTitleText.innerText = secondTitle;
    secondTitleText.style.cssText =
        "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
    titleContainer.appendChild(secondTitleText);
    var descriptionText = document.createElement("div");
    descriptionText.innerText = additionalInfo;
    descriptionText.style.cssText =
        "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
    btn.appendChild(descriptionText);
    var redCircle = document.createElement("div");
    redCircle.style.cssText =
        "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;";
    btn.appendChild(redCircle);
    if (!(title in buttonStateTable)) {
        buttonStateTable[title] = false;
    }
    redCircle.style.backgroundColor = buttonStateTable[title] ? "green" : "red";
    var intervalId;
    btn.onclick = function () {
        buttonStateTable[title] = !buttonStateTable[title];
        SaveManager.saveObject('buttonStates', buttonStateTable);
        if (!SaveManager.importBoolean(title)) {
            SaveManager.saveBoolean(title, buttonStateTable[title], true);
        }
        redCircle.style.backgroundColor = buttonStateTable[title] ? "green" : "red";
        addOutput("Toggled", title, "to", buttonStateTable[title] ? "on" : "off");
        if (title === "Account Gen") {
            if (intervalId === undefined) {
                onClick(buttonStateTable[title]);
                intervalId = window.setTimeout(function () { }, 1);
            }
        }
        else {
            if (intervalId === undefined) {
                intervalId = window.setInterval(function () {
                    onClick(buttonStateTable[title]);
                }, 1);
            }
            else {
                window.clearInterval(intervalId);
                intervalId = undefined;
            }
        }
    };
    return btn;
}
function createRightSliderButton(title, secondTitle, additionalInfo, onClick, minSliderValue, maxSliderValue) {
    var btn = document.createElement("div");
    btn.style.cssText = "\n  position:relative;width:450px;height:100px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n";
    btn.onmouseenter = function () { return (btn.style.transform = "scaleY(1.05)"); };
    btn.onmouseleave = function () { return (btn.style.transform = "scaleY(1)"); };
    var titleContainer = document.createElement("div");
    titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
    btn.appendChild(titleContainer);
    var titleText = document.createElement("div");
    titleText.innerText = title;
    titleText.style.cssText =
        "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
    titleContainer.appendChild(titleText);
    var secondTitleText = document.createElement("div");
    secondTitleText.innerText = secondTitle;
    secondTitleText.style.cssText =
        "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
    titleContainer.appendChild(secondTitleText);
    var descriptionText = document.createElement("div");
    descriptionText.innerText = additionalInfo;
    descriptionText.style.cssText =
        "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
    btn.appendChild(descriptionText);
    var slider = document.createElement("input");
    slider.type = "range";
    slider.min = minSliderValue.toString();
    slider.max = maxSliderValue.toString();
    slider.value = minSliderValue.toString();
    slider.style.cssText = "position:absolute;bottom:5px;right:5px;width:200px;";
    btn.appendChild(slider);
    slider.oninput = function () {
        var newSliderValue = parseInt(slider.value, 10);
        onClick(newSliderValue);
    };
    btn.onclick = function () {
        buttonStateTable[title] = !buttonStateTable[title];
        SaveManager.saveObject('buttonStates', buttonStateTable);
        var newSliderValue = parseInt(slider.value, 10);
        onClick(newSliderValue);
    };
    return btn;
}
function createRightThemeButton(title, secondTitle, additionalInfo, onClick) {
    var btn = document.createElement("div");
    btn.style.cssText = "\n  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;\n  transition:transform 0.2s;cursor:pointer;\n  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;\n  transform-origin: top;\n";
    btn.onmouseenter = function () { return (btn.style.transform = "scaleY(1.05)"); };
    btn.onmouseleave = function () { return (btn.style.transform = "scaleY(1)"); };
    var titleContainer = document.createElement("div");
    titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
    btn.appendChild(titleContainer);
    var titleText = document.createElement("div");
    titleText.innerText = title;
    titleText.style.cssText =
        "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
    titleContainer.appendChild(titleText);
    var secondTitleText = document.createElement("div");
    secondTitleText.innerText = secondTitle;
    secondTitleText.style.cssText =
        "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
    titleContainer.appendChild(secondTitleText);
    var descriptionText = document.createElement("div");
    descriptionText.innerText = additionalInfo;
    descriptionText.style.cssText =
        "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
    btn.appendChild(descriptionText);
    if (!(title in buttonStateTable)) {
        buttonStateTable[title] = false;
    }
    btn.onclick = function () {
        buttonStateTable[title] = !buttonStateTable[title];
        SaveManager.saveObject('buttonStates', buttonStateTable);
        onClick();
    };
    return btn;
}
function createButton(button, index, buttonContainer) {
    var btn = document.createElement('img');
    btn.src = button.src;
    btn.style.cssText = "\n    position: absolute;\n    width: 104px;\n    height: 23.3px;\n    left: 50%;\n    transform: translateX(-50%);\n    top: ".concat(15 + index * 35, "px;\n    z-index: 2147483652;\n    transition: transform 0.2s, scale 0.2s;\n    cursor: pointer;\n  ");
    btn.addEventListener('mouseenter', function () {
        btn.style.transform = 'translateX(-50%) scale(1.05)';
    });
    btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translateX(-50%) scale(1)';
    });
    btn.addEventListener('click', button.onClick);
    buttonContainer.appendChild(btn);
}
function ButtonType(BTN_TYPE) {
    if (BTN_TYPE === void 0) { BTN_TYPE = ""; }
    console.log("active" + BTN_TYPE);
    var rightButtonContainer = document.getElementById("rightButtonContainer");
    if (!rightButtonContainer)
        return;
    while (rightButtonContainer.firstChild) {
        rightButtonContainer.removeChild(rightButtonContainer.firstChild);
    }
    if (BTN_TYPE === "Debug") {
        miniConsole.style.display = 'block';
    }
    else {
        miniConsole.style.display = 'none';
    }
    if (BTN_TYPE === "Themes") {
        themes.forEach(function (theme) {
            rightButtonContainer.appendChild(createRightThemeButton(theme.name, "(Theme)", theme.desc, function () {
                addOutput("Theme", theme.name, "is now active.");
                leftImage.src = theme.LeftImage;
                rightImage.src = theme.RightImage;
                SaveManager.saveString('activeTheme', theme.name);
            }));
        });
    }
    if (BTN_TYPE === "Settings") {
        createRightSliderButton("WalkSpeed", "(Player)", "Change your walk speed.", function (newSliderValue) { console.log(newSliderValue); }, 16, 100);
    }
    Exploits.forEach(function (exploit) {
        if (exploit.type === BTN_TYPE || BTN_TYPE === "") {
            rightButtonContainer.appendChild(createRightButton(exploit.title, "(".concat(exploit.type, ")"), exploit.desc, exploit.pertick));
        }
    });
}
var themes = [
    {
        name: "(Default) Melon Hub",
        LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMelon.png?raw=true",
        RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMelon.png?raw=true",
        desc: "The default Melon Hub theme.",
    },
    {
        name: "Netflix",
        LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftNetflix.png?raw=true",
        RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RIghtNetflix.png?raw=true",
        desc: "Netflix theme including Red and Black colors, and Netlix logos.",
    },
    {
        name: "McDonalds",
        LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMaccas.png?raw=true",
        RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMaccas.png?raw=true",
        desc: "I ran out of theme ideas lmao"
    },
    {
        name: "Minecraft",
        LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMinecraft.png?raw=true",
        RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMinecraft.png?raw=true",
        desc: "Minecraft theme including grass and dirt blocks."
    },
    {
        name: "Hatsune Miku",
        LeftImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMiku.png?raw=true",
        RightImage: "https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMiku.png?raw=true",
        desc: "I'm thinking Miku, Miku, oo-ee-oo"
    }
];
var buttonData = [
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/AllBTN.png?raw=true',
        style: 'top:15px;',
        onClick: function () { return ButtonType(""); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/CombatBTN.png?raw=true',
        style: 'top:72px;',
        onClick: function () { return ButtonType("Combat"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MovementBTN.png?raw=true',
        style: 'top:119px;',
        onClick: function () { return ButtonType("Movement"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/PlayerBTN.png?raw=true',
        style: 'top:166px;',
        onClick: function () { return ButtonType("Player"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ExploitBTN.png?raw=true',
        style: 'top:213px;',
        onClick: function () { return ButtonType("Exploit"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/OtherBTN.png?raw=true',
        style: 'top:260px;',
        onClick: function () { return ButtonType("Other"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/SettingsBTN.png?raw=true',
        style: 'top:354px;',
        onClick: function () { return ButtonType("Settings"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ThemesBTN.png?raw=true',
        style: 'top:401px;',
        onClick: function () { return ButtonType("Themes"); },
    },
    {
        src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/DebugBTN.png?raw=true',
        style: 'top:401px;',
        onClick: function () { return ButtonType("Debug"); },
    },
];
buttonData.forEach(function (button, index) {
    var btn = document.createElement('img');
    btn.src = button.src;
    btn.style.cssText = "position: absolute; width: 104px; height: 23.3px; left: 50%; transform: translateX(-50%); top: ".concat(15 + index * 35, "px; z-index: 2147483652; transition: transform 0.2s, scale 0.2s; cursor: pointer;");
    btn.addEventListener('mouseenter', function () { return btn.style.transform = 'translateX(-50%) scale(1.05)'; });
    btn.addEventListener('mouseleave', function () { return btn.style.transform = 'translateX(-50%) scale(1)'; });
    btn.addEventListener('click', button.onClick);
    buttonContainer.appendChild(btn);
});
ButtonType("");
window.ondragstart = function () { return false; };
// Save/Import
var savedTheme = SaveManager.importString('activeTheme');
if (savedTheme) {
    var theme = themes.find(function (t) { return t.name === savedTheme; });
    if (theme) {
        leftImage.src = theme.LeftImage;
        rightImage.src = theme.RightImage;
    }
}


/******/ })()
;