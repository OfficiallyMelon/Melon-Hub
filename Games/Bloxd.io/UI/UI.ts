// Imports
import { Exploits, Module } from '../Modules/Modules';
import { config } from '../Inject/Inject';
import { SaveManager } from '../Saves/Save';
import { sendPacket, interceptSockets } from '../Modules/Packets'
import { Keybinds, ChangeKeybind } from './Keybinds'

// UI
const link: HTMLLinkElement = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500&display=swap';

const frame: HTMLDivElement = document.createElement('div');
frame.style.cssText = 'position:fixed;top:10px;right:10px;width:697.5px;height:448.5px;background-color:transparent;border-radius:10px;overflow:hidden;z-index:2147483646';

const rightImage: HTMLImageElement = document.createElement('img');
rightImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightMelon.png?raw=true';
rightImage.style.cssText = 'width:697.5px;height:448.5px';
rightImage.style.position = 'relative';

const leftImage: HTMLImageElement = document.createElement('img');
leftImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/LeftMelon.png?raw=true';
leftImage.style.cssText = 'position:fixed;top:10px;right:495px;width:217.5px;height:448.5px;z-index:2147483646';

const melonHubText: HTMLDivElement = document.createElement('div');
melonHubText.innerText = 'Melon Hub';
melonHubText.style.cssText = 'position:absolute; top: 20px; left: 34px; font-family: Inter, sans-serif; font-size: 22px; font-weight: 500; color: white; z-index: 2147483647;';

const versionText: HTMLDivElement = document.createElement('div');
versionText.innerText = '1.0';
versionText.style.cssText = 'position:absolute; top: 20px; left: 145px; font-family: Inter, sans-serif; font-size: 14px; font-weight: 300; color: white; z-index: 2147483647;';

const buttonContainer: HTMLDivElement = document.createElement('div');
buttonContainer.style.cssText = 'position:absolute;top:60px;left:-25px;width:217.5px;height:448.5px;z-index:2147483651;';

const rightButtonContainer: HTMLDivElement = document.createElement('div');
rightButtonContainer.id = 'rightButtonContainer';
rightButtonContainer.style.cssText = 'position: absolute; top: 50px; right: 10px; width: 470px; height: 380px; z-index: 2147483649; overflow-y: auto; overflow-x: hidden; padding-right: 10px; box-sizing: border-box;';

const miniConsole = document.createElement('div');
miniConsole.id = 'miniConsole';
miniConsole.style.cssText = 'position: absolute; top: 40px; right: 5px; width: 470px; height: 380px; background-color: black; color: green; overflow-y: auto; padding: 10px; box-sizing: border-box; font-family: monospace; font-size: 14px; border: 2px solid gray; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: none; z-index: 20000000000;';

const injectionStatus = document.createElement("div");
injectionStatus.id = 'injectionStatus';
injectionStatus.style.cssText =
  "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;";

// Create UI
document.head.appendChild(link); // frame
frame.appendChild(rightImage); // frame
frame.appendChild(leftImage); // frame
frame.appendChild(melonHubText); // title
frame.appendChild(versionText); // version
frame.appendChild(buttonContainer); // buttons
frame.appendChild(rightButtonContainer); // right buttons
frame.appendChild(miniConsole); // debug console
frame.appendChild(injectionStatus); // injection status

document.body.appendChild(frame);

// Intercept Sockets

interceptSockets();

// Debug Console
const logs: { text: any; type: string; }[] = [];

function addOutput(...args: string[]) {
  const text = args.join(' ');
  const output = document.createElement('div');
  output.textContent = `> ${text}`;
  output.style.color = 'green';
  output.style.marginBottom = '5px';
  miniConsole.appendChild(output);
  miniConsole.scrollTop = miniConsole.scrollHeight; 
  logs.push({ text, type: 'output' }); 
}

function addError(...args: string[]) {
  const text = args.join(' ');
  const output = document.createElement('div');
  output.textContent = `> ${text}`;
  output.style.color = 'red';
  output.style.marginBottom = '5px';
  miniConsole.appendChild(output);
  miniConsole.scrollTop = miniConsole.scrollHeight;
  logs.push({ text, type: 'error' });
}

function reapplyLogs() {
  miniConsole.innerHTML = '';
  logs.forEach(log => {
    if (log.type === 'output') {
      addOutput(log.text);
    } else if (log.type === 'error') {
      addError(log.text);
    }
  });
}

// Dragging
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

frame.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - frame.getBoundingClientRect().left;
  offsetY = e.clientY - frame.getBoundingClientRect().top;
  frame.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const newLeft = `${e.clientX - offsetX}px`;
    const newTop = `${e.clientY - offsetY}px`;
    frame.style.left = newLeft;
    frame.style.top = newTop;

    leftImage.style.left = `${e.clientX - offsetX}px`;
    leftImage.style.top = `${e.clientY - offsetY}px`;
  }
});


document.addEventListener('mouseup', () => {
  isDragging = false;
  frame.style.cursor = 'default';
});

// Functions

const buttonStateTable: Record<string, boolean> = {};

function createRightButton(
  title: string,
  secondTitle: string,
  additionalInfo: string,
  onClick: (state: boolean) => void
): HTMLDivElement {
  const btn = document.createElement("div");
  btn.style.cssText = `
  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;
  transition:transform 0.2s;cursor:pointer;
  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;
  transform-origin: top;
`;

  btn.onmouseenter = () => (btn.style.transform = "scaleY(1.05)");
  btn.onmouseleave = () => (btn.style.transform = "scaleY(1)");

  const titleContainer = document.createElement("div");
  titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
  btn.appendChild(titleContainer);

  const titleText = document.createElement("div");
  titleText.innerText = title;
  titleText.style.cssText =
    "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
  titleContainer.appendChild(titleText);

  const secondTitleText = document.createElement("div");
  secondTitleText.innerText = secondTitle;
  secondTitleText.style.cssText =
    "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
  titleContainer.appendChild(secondTitleText);

  const descriptionText = document.createElement("div");
  descriptionText.innerText = additionalInfo;
  descriptionText.style.cssText =
    "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
  btn.appendChild(descriptionText);

  const redCircle = document.createElement("div");
  redCircle.style.cssText =
    "position:absolute;bottom:5px;right:5px;width:15px;height:15px;background:red;border-radius:50%;";
  btn.appendChild(redCircle);

  if (!(title in buttonStateTable)) {
    buttonStateTable[title] = false;
  }

  redCircle.style.backgroundColor = buttonStateTable[title] ? "green" : "red";

  let intervalId: number | undefined;

  Keybinds.forEach(keybind => {
    if (keybind.Module === title) {
    console.log("keybind")
    document.addEventListener('keydown', (event) => {
      console.log(event.key, keybind.Keybind)
      if (event.key !== keybind.Keybind) {
        return;
      }
      if (keybind.KeybindCode.length > 0 && event.code !== keybind.KeybindCode) {
        return;
      }
      console.log(keybind.Keybind)
      buttonStateTable[title] = !buttonStateTable[title];
      redCircle.style.backgroundColor = buttonStateTable[title] ? "green" : "red";
      if (intervalId === undefined) {
        intervalId = window.setInterval(() => {
          onClick(buttonStateTable[title]);
        }, 1);
      } else {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
      addOutput("Toggled", title, "to", buttonStateTable[title] ? "on" : "off");
    });
    }
  });

  btn.onclick = () => {
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
        intervalId = window.setTimeout(() => { }, 1);
      }
    } else {
      if (intervalId === undefined) {
        if (config.noaInstance) {
          intervalId = window.setInterval(() => {
            onClick(buttonStateTable[title]);
          }, 1);
        }
      } else {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    }
  };

  return btn;
}

function createRightSliderButton(
  title: string,
  secondTitle: string,
  additionalInfo: string,
  onClick: (newSliderValue: number) => void,
  minSliderValue: number,
  maxSliderValue: number
): HTMLDivElement {
  const btn = document.createElement("div");
  btn.style.cssText = `
  position:relative;width:450px;height:100px;margin-bottom:10px;border-radius: 10px; right: -5px;
  transition:transform 0.2s;cursor:pointer;
  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;
  transform-origin: top;
`;

  btn.onmouseenter = () => (btn.style.transform = "scaleY(1.05)");
  btn.onmouseleave = () => (btn.style.transform = "scaleY(1)");

  const titleContainer = document.createElement("div");
  titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
  btn.appendChild(titleContainer);

  const titleText = document.createElement("div");
  titleText.innerText = title;
  titleText.style.cssText =
    "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
  titleContainer.appendChild(titleText);

  const secondTitleText = document.createElement("div");
  secondTitleText.innerText = secondTitle;
  secondTitleText.style.cssText =
    "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
  titleContainer.appendChild(secondTitleText);

  const descriptionText = document.createElement("div");
  descriptionText.innerText = additionalInfo;
  descriptionText.style.cssText =
    "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
  btn.appendChild(descriptionText);

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = minSliderValue.toString();
  slider.max = maxSliderValue.toString();
  slider.value = minSliderValue.toString();
  slider.style.cssText = "position:absolute;bottom:5px;right:5px;width:200px;";
  btn.appendChild(slider);

  slider.oninput = () => {
    const newSliderValue = parseInt(slider.value, 10);
    onClick(newSliderValue);
  };

  btn.onclick = () => {
    buttonStateTable[title] = !buttonStateTable[title];
    SaveManager.saveObject('buttonStates', buttonStateTable);
    const newSliderValue = parseInt(slider.value, 10);
    onClick(newSliderValue);
  };

  return btn;
}

function createRightThemeButton(
  title: string,
  secondTitle: string,
  additionalInfo: string,
  onClick: () => void
): HTMLDivElement {
  const btn = document.createElement("div");
  btn.style.cssText = `
  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;
  transition:transform 0.2s;cursor:pointer;
  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;
  transform-origin: top;
`;

  btn.onmouseenter = () => (btn.style.transform = "scaleY(1.05)");
  btn.onmouseleave = () => (btn.style.transform = "scaleY(1)");

  const titleContainer = document.createElement("div");
  titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
  btn.appendChild(titleContainer);

  const titleText = document.createElement("div");
  titleText.innerText = title;
  titleText.style.cssText =
    "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
  titleContainer.appendChild(titleText);

  const secondTitleText = document.createElement("div");
  secondTitleText.innerText = secondTitle;
  secondTitleText.style.cssText =
    "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
  titleContainer.appendChild(secondTitleText);

  const descriptionText = document.createElement("div");
  descriptionText.innerText = additionalInfo;
  descriptionText.style.cssText =
    "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
  btn.appendChild(descriptionText);

  if (!(title in buttonStateTable)) {
    buttonStateTable[title] = false;
  }

  btn.onclick = () => {
    buttonStateTable[title] = !buttonStateTable[title];
    SaveManager.saveObject('buttonStates', buttonStateTable);
    onClick();
  };

  return btn;
}

function createKeybindButton(
title: string,
secondTitle: string,
additionalInfo: string,
): HTMLDivElement {
const btn = document.createElement("div");
btn.style.cssText = `
  position:relative;width:450px;height:75px;margin-bottom:10px;border-radius: 10px; right: -5px;
  transition:transform 0.2s;cursor:pointer;
  background:url('https://raw.githubusercontent.com/OfficiallyMelon/files-cdn/refs/heads/main/bloxd-ui/ButtonHolder.png') no-repeat center/cover;
  transform-origin: top;
`;

btn.onmouseenter = () => (btn.style.transform = "scaleY(1.05)");
btn.onmouseleave = () => (btn.style.transform = "scaleY(1)");

const titleContainer = document.createElement("div");
titleContainer.style.cssText = "position:absolute;top:5px;left:5px;display:flex;align-items:center;";
btn.appendChild(titleContainer);

const titleText = document.createElement("div");
titleText.innerText = title;
titleText.style.cssText =
  "font-family:Gabarito,sans-serif;font-size:16px;font-weight:500;color:white;";
titleContainer.appendChild(titleText);

const secondTitleText = document.createElement("div");
secondTitleText.innerText = secondTitle;
secondTitleText.style.cssText =
  "margin-left:5px;font-family:Gabarito,sans-serif;font-size:13px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
titleContainer.appendChild(secondTitleText);

const descriptionText = document.createElement("div");
descriptionText.innerText = additionalInfo;
descriptionText.style.cssText =
  "position:absolute;top:50px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
btn.appendChild(descriptionText);

const currentKeybind = Keybinds.find((bind) => bind.Module === title)?.Keybind || "None";

const keybindBox = document.createElement("div");
keybindBox.innerText = currentKeybind; 
keybindBox.style.cssText = `
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 50px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-family: Gabarito, sans-serif;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
  cursor: pointer;
`;
btn.appendChild(keybindBox);

btn.onclick = () => {
  document.addEventListener("keydown", (event) => {
    ChangeKeybind(title, event.key.toString(), event.code ? event.code.toString() : "");
    keybindBox.innerText = event.key.toUpperCase();
  }, { once: true });
};

keybindBox.onclick = (event) => {
  event.stopPropagation();
  ChangeKeybind(title, "", "");
  keybindBox.innerText = "None";
};

return btn;
}

function createButton(button: ButtonData, index: number, buttonContainer: HTMLElement): void {
  const btn: HTMLImageElement = document.createElement('img');
  btn.src = button.src;
  btn.style.cssText = `
    position: absolute;
    width: 104px;
    height: 23.3px;
    left: 50%;
    transform: translateX(-50%);
    top: ${15 + index * 35}px;
    z-index: 2147483652;
    transition: transform 0.2s, scale 0.2s;
    cursor: pointer;
  `;
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateX(-50%) scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateX(-50%) scale(1)';
  });
  btn.addEventListener('click', button.onClick);
  buttonContainer.appendChild(btn);
}

function ButtonType(BTN_TYPE = ""): void {
  console.log("active" + BTN_TYPE);
  const rightButtonContainer = document.getElementById(
    "rightButtonContainer"
  ) as HTMLElement;
  if (!rightButtonContainer) return;

  while (rightButtonContainer.firstChild) {
    rightButtonContainer.removeChild(rightButtonContainer.firstChild);
  }
  
  if (BTN_TYPE === "Debug") {
    miniConsole.style.display = 'block';
  } else {
    miniConsole.style.display = 'none';
  }
  
  if (BTN_TYPE === "Themes") {
    themes.forEach((theme) => {
      rightButtonContainer.appendChild(
        createRightThemeButton(
          theme.name,
          `(Theme)`,
          theme.desc,
          function () {
            addOutput("Theme", theme.name, "is now active.");
            leftImage.src = theme.LeftImage;
            rightImage.src = theme.RightImage;
            SaveManager.saveString('activeTheme', theme.name);
          }
        )
      );
    });
  }

  if (BTN_TYPE === "Settings") {
    Exploits.forEach((exploit) => {
      rightButtonContainer.appendChild(
        createKeybindButton(exploit.title, "Keybind", "Change keybind")
      )
    })
  }

  Exploits.forEach((exploit) => {
    if (exploit.type === BTN_TYPE || BTN_TYPE === "") {
      rightButtonContainer.appendChild(
        createRightButton(
          exploit.title,
          `(${exploit.type})`,
          exploit.desc,
          exploit.pertick
        )
      );

    }
  });
}

interface Themes {
  name: string;
  LeftImage: string;
  RightImage: string;
  desc: string;
}

const themes: Themes[] = [
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
]

interface ButtonData {
  src: string;
  style: string;
  onClick: () => void;
}

const buttonData: ButtonData[] = [
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/AllBTN.png?raw=true',
    style: 'top:15px;',
    onClick: () => ButtonType(""),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/CombatBTN.png?raw=true',
    style: 'top:72px;',
    onClick: () => ButtonType("Combat"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MovementBTN.png?raw=true',
    style: 'top:119px;',
    onClick: () => ButtonType("Movement"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/PlayerBTN.png?raw=true',
    style: 'top:166px;',
    onClick: () => ButtonType("Player"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ExploitBTN.png?raw=true',
    style: 'top:213px;',
    onClick: () => ButtonType("Exploit"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/OtherBTN.png?raw=true',
    style: 'top:260px;',
    onClick: () => ButtonType("Other"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/SettingsBTN.png?raw=true',
    style: 'top:354px;',
    onClick: () => ButtonType("Settings"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/ThemesBTN.png?raw=true',
    style: 'top:401px;',
    onClick: () => ButtonType("Themes"),
  },
  {
    src: 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/DebugBTN.png?raw=true',
    style: 'top:401px;',
    onClick: () => ButtonType("Debug"),
  },
];

buttonData.forEach((button, index) => {
  const btn = document.createElement('img');
  btn.src = button.src;
  btn.style.cssText = `position: absolute; width: 104px; height: 23.3px; left: 50%; transform: translateX(-50%); top: ${15 + index * 35}px; z-index: 2147483652; transition: transform 0.2s, scale 0.2s; cursor: pointer;`;
  btn.addEventListener('mouseenter', () => btn.style.transform = 'translateX(-50%) scale(1.05)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'translateX(-50%) scale(1)');
  btn.addEventListener('click', button.onClick);
  buttonContainer.appendChild(btn);
});

ButtonType("");
window.ondragstart = () => false

// Save/Import
const savedTheme = SaveManager.importString('activeTheme');

if (savedTheme) {
  const theme = themes.find(t => t.name === savedTheme);
  if (theme) {
    leftImage.src = theme.LeftImage;
    rightImage.src = theme.RightImage;
  }
}

export {addOutput, addError, reapplyLogs, injectionStatus};