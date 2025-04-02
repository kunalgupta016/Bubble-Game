    document.querySelector(".class").addEventListener('click',startGame());
    
    function startGame(){
    document.getElementById("gameModal").style.display = "none";
    document.getElementById("main").style.display = "flex";
    var rn;
    var score = 0;
    
    function displayLeaderboard(){
    document.querySelector("#leaderboard-container").style.display = "block";
    var leaderboard = JSON.parse(localStorage.getItem("leaderboard"))||[];
    var leaderboardList = document.querySelector("#leaderboard");
    leaderboardList.innerHTML = "";
    leaderboard.forEach(entry => {
        var li = document.createElement("li");
        li.textContent = entry.name + " - " + entry.score;
        leaderboardList.appendChild(li);
    });

}




function endGame(){
            document.querySelector("#pbtm").innerHTML = "";

            if (!document.querySelector("#leaderboard-container")) {
                var leaderboardContainer = document.createElement("div");
                leaderboardContainer.id = "leaderboard-container";
                leaderboardContainer.innerHTML = `<h2>Leaderboard</h2><ul id="leaderboard"></ul>`;
                document.querySelector("#pbtm").appendChild(leaderboardContainer);
              }

            var playerName = prompt("Game Over! Enter your Name: ");
            if(playerName==="NULL" || playerName.trim()===""){
                playerName = "Unknown";
            }
            saveScore(playerName, score);
            displayLeaderboard();
            

            var restartButton = document.createElement("button");
            restartButton.textContent = "Restart Game";
            restartButton.className = "restart-btn";
            restartButton.addEventListener("click", restartGame);
            document.querySelector("#pbtm").appendChild(restartButton);
            alert("The Score is " + score);

            
}

function saveScore(name,score){
    var leaderboard = JSON.parse(localStorage.getItem("leaderboard")) ||[];
    leaderboard.push({name:name,score:score});
    leaderboard.sort(function(a, b) {
        return b.score - a.score;
    });
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

}



function makeBubble() {
    const container = document.querySelector("#pbtm");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Define the approximate size and gap of a bubble.
    // You might need to adjust these values based on your CSS.
    const bubbleSize = 20; // Default bubble width/height in pixels (for larger screens)
    const gap = 12;       // Gap between bubbles (from CSS)
  
    // Calculate how many bubbles fit in one row and one column.
    const columns = Math.floor((containerWidth ) / (bubbleSize + gap));
    const rows = Math.floor((containerHeight  ) / (bubbleSize + gap));
    const totalBubbles = columns * rows;
  
    let clutter = '';
    for(let i = 0; i < totalBubbles; i++){
      rn = Math.floor(Math.random() * 10);
      clutter += `<div class="bubble">${rn}</div>`;
    }
    container.innerHTML = clutter;    
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

            endGame();
            
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
    }


    



