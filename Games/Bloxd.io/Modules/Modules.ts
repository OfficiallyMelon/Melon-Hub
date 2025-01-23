// Modules.ts
import { config } from '../Injection/Inject';

interface Module {
    type: string;
    title: string;
    desc: string;
    pertick: (state: boolean) => void;
}

class ExecutionFunctions {
    constructor() {}
    
    distanceBetween(point1: [number, number, number], point2: [number, number, number]): number {
        return (
            Math.pow(point2[0] - point1[0], 2) +
            Math.pow(point2[1] - point1[1], 2) +
            Math.pow(point2[2] - point1[2], 2)
        );
    }

    distanceBetweenSqrt(point1: [number, number, number], point2: [number, number, number]): number {
        return Math.sqrt(this.distanceBetween(point1, point2));
    }

    normalizeVector(vector: [number, number, number]): [number, number, number] {
        const magnitude = vector[0] * vector[0] + vector[1] * vector[1] + vector[2] * vector[2];
        if (magnitude > 0) {
            const invMagnitude = 1 / Math.sqrt(magnitude);
            return [vector[0] * invMagnitude, vector[1] * invMagnitude, vector[2] * invMagnitude];
        }
        return vector;
    }

    deg2rad(degrees: number): number {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }

    clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

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

    killaura(range: number): void {
        const targets = this.getTargets(range);
        if (targets.length === 0) {
            return;
        }
        const nearestTarget = targets;
        console.log("Nearest Target: ", nearestTarget);
        const playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
        const targetPosition = config.noaInstance.ents.getPositionData(nearestTarget).position;
        console.log("Player Position: ", playerPosition);
        console.log("Target Position: ", targetPosition);
        if (this.distanceBetweenSqrt(playerPosition, targetPosition) <= 5) {
            const originalDirection = config.noaInstance.camera._dirVector;
            config.noaInstance.camera._dirVector = this.normalizeVector([
                targetPosition[0] - playerPosition[0],
                targetPosition[1] - playerPosition[1],
                targetPosition[2] - playerPosition[2]
            ]);
            this.simulateLeftClick(document.querySelector("#noa-canvas") as HTMLElement);
            config.noaInstance.camera._dirVector = originalDirection;
        }
    }

    getTargets(range: number): number[] {
        const targets = this.getAllPlayers();
        return targets.filter(target => {
            const canAttack = config.noaInstance.otherEntitySettings[target].canAttack;
            return canAttack
        });
    }

    calculateMovement2D(speed: number) {
        const heading = config.noaInstance.camera.heading;
        const cosHeading = Math.cos(heading);
        const sinHeading = -Math.sin(heading);
        let lateralMovement = 0;

        if (config.noaInstance.inputs.state.left) {
            lateralMovement = -1;
        } else if (config.noaInstance.inputs.state.right) {
            lateralMovement = 1;
        }

        const cosHeading90 = Math.cos(heading + Math.PI / 2);
        const sinHeading90 = -Math.sin(heading + Math.PI / 2);
        let forwardMovement = 0;

        if (config.noaInstance.inputs.state.forward) {
            forwardMovement = -1;
        } else if (config.noaInstance.inputs.state.backward) {
            forwardMovement = 1;
        }

        const movementMagnitude = Math.sqrt(Math.abs(lateralMovement) + Math.abs(forwardMovement));

        if (movementMagnitude === 0) {
            return [0, 0];
        }

        const movementX = (cosHeading * lateralMovement + cosHeading90 * forwardMovement) / movementMagnitude * speed;
        const movementY = (sinHeading * lateralMovement + sinHeading90 * forwardMovement) / movementMagnitude * speed;

        return [movementX, movementY];
    }
    varExists(variable: any): boolean {
        return (typeof variable !== "undefined" && typeof variable.val() !== "undefined");
    }
    getAllPlayers(): number[] {
        if (!config.noaInstance) {
            console.error("noaInstance is not initialized!");
            return [];
        }
        if (!config.noaInstance.playerNames) {
            console.error("playerNames is not initialized!");
            return [];
        }
        return Object.keys(config.noaInstance.playerNames)
            .map((key) => parseInt(key))
            .filter((id) =>
                id !== config.noaInstance.playerEntity &&
                config.noaInstance.ents.hasComponent(id, "position") &&
                config.noaInstance.ents.hasComponent(id, "genericPlayerState") &&
                config.noaInstance.ents.getGenericPlayerState(id).isAlive
            );
    }    
    
    removeAllCookies() {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

    getNearestTarget(targets: any[]) {
        const playerPosition = config.noaInstance.ents.getPosition(config.noaInstance.playerEntity);
        let nearestTarget = undefined;
        let nearestDistance = Infinity;
        for (const target of targets) {
            const distance = this.distanceBetween(playerPosition, config.noaInstance.ents.getPosition(target));
            if (nearestTarget === undefined || distance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = distance;
            }
        }
        return nearestTarget;
    }
}

const Utilities = new ExecutionFunctions();

const Exploits: Module[] = [
    {
        type: "Combat",
        title: "Kill Aura",
        desc: "Detects and attacks nearby entities",
        pertick: (state) => {
            if (state) {
                if (config.CurrentlyInjected && config.noaInstance) {
                    Utilities.killaura(100)
                }
                console.log("state ticked")
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

        pertick: () => {

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
        type: "Player",
        title: "Account Gen",
        desc: "Generates accounts for you to use. (Requires Refresh)",

        pertick: () => {
            Utilities.removeAllCookies();
            location.reload();
        },
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
        type: "Settings",
        title: "Soon",
        desc: "Coming soon",

        pertick: () => {

        },
    },
    {
        type: "Themes",
        title: "Default Theme",
        desc: "The default theme for Melon Hub",

        pertick: () => {

        },
    },
];

export { Exploits, Module };
