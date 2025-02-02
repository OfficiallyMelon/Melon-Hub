interface SetBinds {
    Module: string;
    Keybind: string;
    KeybindCode: string;
}

const loadKeybinds = (): SetBinds[] => {
    const savedKeybinds = localStorage.getItem('keybinds');
    if (savedKeybinds) {
        return JSON.parse(savedKeybinds);
    } else {
        return [
            {
                Module: "Kill Aura",
                Keybind: "",
                KeybindCode: "",
            },            
            {
                Module: "Aimbot",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Auto Clicker",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Scaffold",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Auto Trigger",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Auto Sprint",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Fast Crouch",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Infinite Jump",
                Keybind: "",
                KeybindCode: "",
            },
            {
                Module: "Auto Speed",
                Keybind: "",
                KeybindCode: "",
            },
        ];
    }
};

let Keybinds: SetBinds[] = loadKeybinds();

function ChangeKeybind(Module: string, Key: string | null, KeyCode: string | null) {
    for (const element of Keybinds) {
        if (element.Module === Module) {
            element.Keybind = Key !== null ? Key : element.Keybind;
            element.KeybindCode = KeyCode !== null ? KeyCode : element.KeybindCode;
        }
    }
    localStorage.setItem('keybinds', JSON.stringify(Keybinds));
}

export { Keybinds, ChangeKeybind, loadKeybinds}
