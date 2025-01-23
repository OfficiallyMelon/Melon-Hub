// Modules.ts
import { config } from '../Inject/Inject';

interface Module {
    type: string;
    title: string;
    desc: string;
    pertick: (state: boolean) => void;
}

class ExecutionFunctions {
    constructor() {}

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
    
    removeAllCookies() {
        const cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
    }

}

const Utilities = new ExecutionFunctions();

const Exploits: Module[] = [
    {
        type: "Combat",
        title: "Kill Aura",
        desc: "Detects and attacks nearby entities (BROKEN)",
        pertick: (state) => {
            if (state) {
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
