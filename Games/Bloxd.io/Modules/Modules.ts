// Modules.ts
import { config } from '../Inject/Inject';
import {addError, addOutput, reapplyLogs} from '../UI/UI';
import { sendPacket, PacketType } from './Packets'

interface Module {
    type: string;
    title: string;
    desc: string;
    pertick: (state: boolean) => void;
}

class ExecutionFunctions {
    constructor() { }

    simulateLeftClick(element: HTMLElement): void {
        const mouseDownEvent = new MouseEvent("mousedown", {
            button: 0,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseDownEvent);

        const mouseUpEvent = new MouseEvent("mouseup", {
            button: 0,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseUpEvent);
    }
    calculateDistance(pos1: { x: number; y: number; z: number }, pos2: { x: number; y: number; z: number }): number {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const dz = pos2.z - pos1.z;
        return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }

    simulateRightClick(element: HTMLElement): void {
        const mouseDownEvent = new MouseEvent("mousedown", {
            button: 2,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseDownEvent);

        const mouseUpEvent = new MouseEvent("mouseup", {
            button: 2,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(mouseUpEvent);
    }

    distanceBetween(point1:any, point2:any) {
        const dx = point2[0] - point1[0];
        const dy = point2[1] - point1[1];
        const dz = point2[2] - point1[2];
        return dx * dx + dy * dy + dz * dz;
    }

    setDir(facing: number[]): void {
        const heading = Math.atan2(facing[0], facing[2]);
        const pitch = Math.asin(-facing[1]);
        config.noaInstance.camera.heading = heading;
        config.noaInstance.camera.pitch = pitch;
        //cam(heading, pitch);
    }

    distanceBetweenSqrt(point1: any, point2: any) {
        return Math.sqrt(this.distanceBetween(point1, point2));
    }

    ChangeCrouchSpeed(speed: number): void {
        config.noaInstance.serverSettings.crouchingSpeed = speed;
    }

    ChangeWalkSpeed(speed: number): void {
        config.noaInstance.serverSettings.walkingSpeed = speed;
    }

    InstantRespawn(): void {
        if (config.noaInstance) {
            config.noaInstance.serverSettings.secsToRespawn = 0;
            (document.querySelector(".NewButton.BlueButton.RespawnButton") as HTMLElement)?.click();
        }
    }
    
    normalizeVector(vector: number[]): number[] {
        const magnitude = vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2];
        if (magnitude > 0) {
            const invMagnitude = 1 / Math.sqrt(magnitude);
            return [vector[0] * invMagnitude, vector[1] * invMagnitude, vector[2] * invMagnitude];
        }
        return vector;
    }

    killaura(range: number) {
            const targets = getAttackablePlayers();
            if (targets.length === 0) {
                addOutput("No targets found");
                return;
            }
            const nearestTarget = getNearestTarget(targets);
            const playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
            const targetPosition = config.noaInstance.ents.getPositionData(nearestTarget).position;

            if (Utilities.distanceBetweenSqrt(playerPosition, targetPosition) <= 5) {
                const originalDirection = config.noaInstance.camera._dirVector;
                config.noaInstance.camera._dirVector = Utilities.normalizeVector([
                    targetPosition[0] - playerPosition[0],
                    targetPosition[1] - playerPosition[1],
                    targetPosition[2] - playerPosition[2]
                ]);
                const canvasElement = document.querySelector("#noa-canvas");
                if (canvasElement) {
                    this.simulateLeftClick(canvasElement as HTMLElement);
                }
                config.noaInstance.camera._dirVector = originalDirection;
            }
        }
    

    removeAllCookies() {
        const cookies = document.cookie.split(";");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }
}

    function getAllPlayers() {
        const { playerNames, playerEntity, ents } = config.noaInstance;
        const playerIds = [];
        for (const key in playerNames) {
            if (playerNames.hasOwnProperty(key)) {
                const id = Number(key);
                if (id !== playerEntity && ents.hasComponent(id, "position") && ents.hasComponent(id, 'genericLifeformState') && ents.genericLifeformState(id).isAlive) {
                    playerIds.push(id);
                }
            }
        }
        return playerIds;
    }

    
    function getAttackablePlayers() {
        return getAllPlayers().filter(id => config.noaInstance.otherPlayerSettings[config.noaInstance.playerEntity][id]?.canAttack);
    }
    
    function getNearestTarget(targets:any) {
        const playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
        let nearestTarget = undefined;
        let nearestDistance = Infinity;
        for (const target of targets) {
            const distance = Utilities.distanceBetween(playerPosition, config.noaInstance.ents.getPosition(target));
            if (nearestTarget === undefined || distance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = distance;
            }
        }
        return nearestTarget;
    }

let AimbotStatus = false;

const Utilities = new ExecutionFunctions();

const Exploits: Module[] = [
    {
        type: "Combat",
        title: "Kill Aura",
        desc: "Detects and attacks nearby entities",
        pertick: (state) => {
            if (state) {
                let cDist = 3.5;
                let cPlayer = null
    
                config.noaInstance.entities._storage.position.list.forEach((p: any) => {
                    if (typeof p.__id !== "number" && p.__id != 1 && p.__id !== config.noaInstance.serverPlayerEntity) {
                        console.log(p.__id)
                        const lifeformState = config.noaInstance.entities.getGenericLifeformState(p.__id);
                        if (lifeformState && lifeformState.isAlive) {
                            const myPos = config.noaInstance.entities.getPosition(1);
                            const enemyPos = p.position;
                            const myPosObj = {
                                x: myPos[0],
                                y: myPos[1],
                                z: myPos[2]
                            };
                            const enemyPosObj = {
                                x: enemyPos[0],
                                y: enemyPos[1],
                                z: enemyPos[2]
                            };
                            if (myPos[0] === enemyPos[0] && myPos[1] === enemyPos[1] && myPos[2] === enemyPos[2]) {
                                return;
                            }
                            const distance = Utilities.calculateDistance(myPosObj, enemyPosObj);
                            if (distance < cDist) {
                                cPlayer = enemyPos;
                            }
                        }
                    }
                });
    
                if (cPlayer) {
                    const myPos = config.noaInstance.entities.getPosition(1);
                    const dirVec = [cPlayer[0] - myPos[0], cPlayer[1] - myPos[1], cPlayer[2] - myPos[2]];
                    const normVec = Utilities.normalizeVector(dirVec);
                    Utilities.setDir(normVec);
                    const element = document.querySelector("#noa-canvas") as HTMLElement | null;
                    if (element) {
                        element.dispatchEvent(new MouseEvent("mousedown", { button: 0, bubbles: true, cancelable: true }));
                        element.dispatchEvent(new MouseEvent("mouseup", { button: 0, bubbles: true, cancelable: true }));
                    }
                }
            }
        },
    },
    {
        type: "Combat",
        title: "Auto Clicker",
        desc: "Automatically clicks for you",

        pertick: () => {
            if (config.CurrentlyInjected && config.noaInstance) {
                const element = document.querySelector("#noa-canvas") as HTMLElement | null;
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

        pertick: (status) => {
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

        pertick: (status) => {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    const player = config.noaInstance.playerEntity;
                    const position = config.noaInstance.ents.getPosition(player);
                    const block = config.noaInstance.getBlock(position[0], position[1] - 1, position[2]);
                    const f = config.noaInstance.ents.getInventoryState(config.noaInstance.playerEntity).selectedItem;
                    const ObjID = f && ("CubeBlock" === f.typeObj.type || "TwoDBlock" === f.typeObj.type || "SlabBlock" === f.typeObj.type) ? f.typeObj.id : null;
                    if (block === 0) {
                        const roundedPosition = [
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
                            config.noaInstance.setBlock(roundedPosition[0], roundedPosition[1], roundedPosition[2], ObjID)
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

        pertick: () => {
            if (config.CurrentlyInjected && config.noaInstance) {
                Utilities.InstantRespawn();
            }
        },
    },
    {
        type: "Combat",
        title: "Auto Trigger",
        desc: "Auto trigger for Aimbot (BROKEN)",

        pertick: (state) => {
            if (state && AimbotStatus) {
                const element = document.querySelector("#noa-canvas") as HTMLElement | null;
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

        pertick: () => {
            Utilities.removeAllCookies();
            location.reload();
        },
    },
    {
        type: "Combat",
        title: "Aimbot",
        desc: "Automatically aims at the nearest player.",
        pertick: (state) => {
            function normalizeVector(vector: number[]): number[] {
                const magnitude = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2);
                if (magnitude === 0) {
                    return [0, 0, 0];
                }
                return vector.map(component => component / magnitude);
            }

            function setDir(facing: number[]): void {
                const heading = Math.atan2(facing[0], facing[2]);
                const pitch = Math.asin(-facing[1]);
                config.noaInstance.camera.heading = heading;
                config.noaInstance.camera.pitch = pitch;
                //cam(heading, pitch);
            }

            function calculateDistance(pos1: { x: number; y: number; z: number }, pos2: { x: number; y: number; z: number }): number {
                const dx = pos2.x - pos1.x;
                const dy = pos2.y - pos1.y;
                const dz = pos2.z - pos1.z;
                return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
            }
            if (state) {

            let cPlayer: number[] | null = null;
            let cDist = Infinity;

            config.noaInstance.entities._storage.position.list.forEach((p: any) => {
                if (typeof p.__id !== "number" && p.__id != 1 && p.__id !== config.noaInstance.serverPlayerEntity) {
                    console.log(p.__id)
                    const lifeformState = config.noaInstance.entities.getGenericLifeformState(p.__id);
                    if (lifeformState && lifeformState.isAlive) {
                        const myPos = config.noaInstance.entities.getPosition(1);
                        const enemyPos = p.position;
                        const myPosObj = {
                            x: myPos[0],
                            y: myPos[1],
                            z: myPos[2]
                        };
                        const enemyPosObj = {
                            x: enemyPos[0],
                            y: enemyPos[1],
                            z: enemyPos[2]
                        };
                        if (myPos[0] === enemyPos[0] && myPos[1] === enemyPos[1] && myPos[2] === enemyPos[2]) {
                            return;
                        }
                        const distance = calculateDistance(myPosObj, enemyPosObj);
                        if (distance < cDist) {
                            cDist = distance;
                            cPlayer = enemyPos;
                        }
                    }
                }
            });

            if (cPlayer && cDist <= 20) {
                const myPos = config.noaInstance.entities.getPosition(1);
                const dirVec = [cPlayer[0] - myPos[0], cPlayer[1] - myPos[1], cPlayer[2] - myPos[2]];
                const normVec = normalizeVector(dirVec);
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

        pertick: () => {
            if (config.CurrentlyInjected && config.noaInstance) {
                Utilities.ChangeWalkSpeed(config.noaInstance.serverSettings.runningSpeed);
            }
        },
    },
    {
        type: "Movement",
        title: "Fast Crouch",
        desc: "Increase crouching speed.",

        pertick: (status) => {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeCrouchSpeed(config.noaInstance.serverSettings.runningSpeed);
                }
            } else {
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

        pertick: (status) => {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.ChangeWalkSpeed(7.4);
                }
            } else {
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

        pertick: (status) => {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    config.noaInstance.serverSettings.airJumpCount = Infinity;
                }
            } else {
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

        pertick: (status) => {
            if (status) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    const noa = config.noaInstance;
                    const player = noa.playerEntity;
                    const position = noa.ents.getPosition(player); // [x, y, z]

                    const x = position[0];
                    const y = position[1];
                    const z = position[2];

                    const blockInFront = noa.getBlock(x, y, z + 1);

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

        pertick: () => {

        },
    },
];

export { Exploits, Module };
