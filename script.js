var rn;
var score = 0;

function makeBubble(){
    var clutter = '';
    for(var i = 1; i <= 168; i++){
        rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

function incrScore(){
    score += 10;
    document.querySelector("#scr").innerHTML = score;
}

var Timer = 60;
var timerint; // to store interval ID

function runtimer(){
    timerint = setInterval(function(){
        if(Timer > 0){
            Timer--;
            document.querySelector("#timerval").textContent = Timer;
        } else {
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = "";
            // Create a restart button after the game ends with custom CSS class "restart-btn"
            var restartButton = document.createElement("button");
            restartButton.textContent = "Restart Game";
            restartButton.className = "restart-btn";
            restartButton.addEventListener("click", restartGame);
            document.querySelector("#pbtm").appendChild(restartButton);
            alert("The Score is " + score);
        }
    }, 1000);
}

var hitNumber;
function hitf(){
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = hitNumber;
}

document.querySelector("#pbtm").addEventListener("click", function(dets){
    // Only consider clicks on bubbles
    var clickedNumber = Number(dets.target.textContent);
    if(clickedNumber === hitNumber){

        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        incrScore();
        hitf(); // Update the hit number before making new bubbles
        makeBubble();
    }
});

function restartGame(){
    // Reset game variables
    score = 0;
    Timer = 60;
    document.querySelector("#scr").textContent = score;
    document.querySelector("#timerval").textContent = Timer;
    // Remove the restart button and prepare game area for new bubbles
    document.querySelector("#pbtm").innerHTML = "";
    hitf();
    makeBubble();
    // Restart timer
    runtimer();
}

// Start game
hitf();
runtimer();
makeBubble();
