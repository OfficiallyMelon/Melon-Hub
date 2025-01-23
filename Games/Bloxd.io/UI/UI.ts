// Imports
import { Exploits, Module } from '../Modules/Modules';
import { config } from '../Inject/Inject';

// UI
const link: HTMLLinkElement = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500&display=swap';

const frame: HTMLDivElement = document.createElement('div');
frame.style.cssText = 'position:fixed;top:10px;right:10px;width:697.5px;height:448.5px;background-color:transparent;border-radius:10px;overflow:hidden;z-index:2147483646';

const rightImageAbove: HTMLImageElement = document.createElement('img');
rightImageAbove.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/RightAboveGradient.png?raw=true';
rightImageAbove.style.cssText = 'width:697.5px;height:448.5px;position:absolute;top:0;left:0;z-index:2147483650';

const rightImage: HTMLImageElement = document.createElement('img');
rightImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/Right.png?raw=true';
rightImage.style.cssText = 'width:697.5px;height:448.5px';
rightImage.style.position = 'relative';

const bottomLeftImage: HTMLImageElement = document.createElement('img');
bottomLeftImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MelonBL.png?raw=true';
bottomLeftImage.style.cssText = 'position:absolute;bottom:0;left:0;width:198px;height:148.5px;z-index:2147483649';

const topRightImage: HTMLImageElement = document.createElement('img');
topRightImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MelonTR.png?raw=true';
topRightImage.style.cssText = 'position:absolute;top:0;right:0;width:183px;height:150px;z-index:2147483648';

const bottomRightImage: HTMLImageElement = document.createElement('img');
bottomRightImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/MelonBR.png?raw=true';
bottomRightImage.style.cssText = 'position:absolute;bottom:0;right:0;width:217.5px;height:217.5px;z-index:2147483648';

const leftImage: HTMLImageElement = document.createElement('img');
leftImage.src = 'https://github.com/OfficiallyMelon/Melon-Hub/blob/main/Assets/bloxd.io/Left.png?raw=true';
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

// Create UI
document.head.appendChild(link); // frame
frame.appendChild(rightImageAbove); // gradient
frame.appendChild(rightImage); // frame
frame.appendChild(bottomLeftImage); // melon images
frame.appendChild(topRightImage); // melon images
frame.appendChild(bottomRightImage); // melon images
frame.appendChild(leftImage); // frame
frame.appendChild(melonHubText); // title
frame.appendChild(versionText); // version
frame.appendChild(buttonContainer); // buttons
frame.appendChild(rightButtonContainer); // right buttons

document.body.appendChild(frame);

// Hooking
console.log(config);

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
  `;

  btn.onmouseenter = () => (btn.style.transform = "scale(1.05)");
  btn.onmouseleave = () => (btn.style.transform = "scale(1)");

  const titleText = document.createElement("div");
  titleText.innerText = title;
  titleText.style.cssText =
    "position:absolute;top:5px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:500;color:white;";
  btn.appendChild(titleText);

  const secondTitleText = document.createElement("div");
  secondTitleText.innerText = secondTitle;
  secondTitleText.style.cssText =
    "position:absolute;top:6px;left:70px;font-family:Gabarito,sans-serif;font-size:16px;font-weight:400;color:rgba(255, 255, 255, 0.56);";
  btn.appendChild(secondTitleText);

  const descriptionText = document.createElement("div");
  descriptionText.innerText = additionalInfo;
  descriptionText.style.cssText =
    "position:absolute;top:40px;left:5px;font-family:Gabarito,sans-serif;font-size:14px;font-weight:400;color:rgba(255, 255, 255, 0.71);";
  btn.appendChild(descriptionText);

  const redCircle = document.createElement("div");
  redCircle.style.cssText =
    "position:absolute;bottom:5px;right:5px;width:20px;height:20px;background:red;border-radius:50%;";
  btn.appendChild(redCircle);

  if (!(title in buttonStateTable)) {
    buttonStateTable[title] = false;
  }

  redCircle.style.backgroundColor = buttonStateTable[title] ? "green" : "red";

  let intervalId: number | undefined;

  btn.onclick = () => {
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
window.ondragstart = function() { return false; } // stop dragging
