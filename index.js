
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

document.getElementById("reveal-page-button").addEventListener("click", revealPage)

function revealPage() {
    document.getElementById("reveal-page-button").className = "hidden"
    document.getElementById("svg-container").className = ""
    balloons();
}

//balloons floating up animation
function balloons(){
    const duration = 5 * 1000;
const animationEnd = Date.now() + duration;
let skew = 1;
const scalar = 6;
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

