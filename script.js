const card = document.getElementById("card");

const keyMap = [
    "q","w","e","r","t","y","u","i","o","p",
    "a","s","d","f","g","h","j","k","l",
    "z","x","c","v","b","n","m",
    "1","2","3","4"
];

// Track which keys are currently pressed
let isKeyDown = {};

keyMap.forEach((key, index) => {
    let btn = document.createElement("div");
    btn.className = "key";
    btn.dataset.sound = index + 1;
    btn.textContent = key.toUpperCase();
    card.appendChild(btn);

    // Mouse events → play once
    btn.addEventListener("mousedown", () => playOnce(btn, index));
    btn.addEventListener("mouseup", () => releaseKey(btn));
});

function playOnce(button, index) {
    // Add animation
    button.classList.add("pressed");

    // Play sound only once
    let audio = new Audio(`KeySounds/${index + 1}.mp3`);
    audio.currentTime = 0;
    audio.play();
}

function releaseKey(button) {
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 120);
}

// KEYBOARD:
document.addEventListener("keydown", (event) => {
    let key = event.key.toLowerCase();
    let index = keyMap.indexOf(key);

    if (index !== -1) {

        // IMPORTANT: prevent repeat on hold
        if (isKeyDown[key]) return;
        isKeyDown[key] = true;

        let btn = card.children[index];
        playOnce(btn, index);
    }
});

document.addEventListener("keyup", (event) => {
    let key = event.key.toLowerCase();
    let index = keyMap.indexOf(key);

    if (index !== -1) {
        isKeyDown[key] = false;

        let btn = card.children[index];
        releaseKey(btn);
    }
});
