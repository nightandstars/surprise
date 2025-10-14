//changes name of the birthday person to the one specified in the query parameter if one has been specified
window.addEventListener("load", function (){
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("name")){
        document.getElementById("name").innerHTML = queryParams.get("name");
    }
});

//rainbow colors the name
window.addEventListener("load", function() {
    const elements = document.getElementsByClassName("rainbowText");
    for (let i = 0; i < elements.length; i++) {
        generateRainbowText(elements[i]);
    }
});

function generateRainbowText(element) {
    const text = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        const charElem = document.createElement("span");
        charElem.style.color = "hsl(" + (360 * i / text.length) + ",100%,50%)";
        charElem.innerHTML = text[i];
        element.appendChild(charElem);
    }
}

//makes happy birthday elements visible, starts song and animations, shows replay button after delay
document.getElementById("reveal-page-button").addEventListener("click", revealPage)

function revealPage() {
    document.getElementById("reveal-page-button").className = "hidden"
    document.getElementById("svg-container").className = ""
    document.getElementById("birthday-cake-img").className = ""
    birthdaySong();
    balloons();
    fireworks();
    setTimeout(showReplayButton, 10000)
}

function showReplayButton(){
    document.getElementById("replay-button").className = ""
}

//starts playing audio song
function birthdaySong(){
    const audio = new Audio("assets/happy-birthday-368842.mp3");
    audio.play()
}

document.getElementById("replay-button").addEventListener("click", replayAnimation)

//replays ballons and fireworks
function replayAnimation() {
    balloons();
    fireworks();
}

//balloons floating up animation
function balloons(){
    const duration = 8 * 1000;
const animationEnd = Date.now() + duration;
let skew = 1;
const scalar = 6;
    //emoji showing up on screen
const balloon = confetti.shapeFromText({ text: '🎈', scalar });
let frameCount = 0;

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

(function frame() {
    frameCount++;
    const timeLeft = animationEnd - Date.now();
    skew = Math.max(0.8, skew - 0.001);

    if(frameCount % 15 === 0){
        confetti({
            particleCount: 1,
            startVelocity: randomInRange(2,5),
            ticks: 1000,
            origin: {
                x: Math.random(),
                y: 1
            },
            shapes: [balloon],
            gravity: -0.7,
            scalar: 6,
            drift: randomInRange(-0.3, 0.3),
            flat: true
        });
    }

    if (timeLeft > 0) {
        requestAnimationFrame(frame);
    }
}());
}

//fireworks animation
function fireworks() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}
