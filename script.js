var rn;
var score = 0;

function makeBubble(){
    var clutter = ''
    for(var i=1; i<=168; i++){
        rn = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;
}

function incrScore(){
    score += 10;
    document.querySelector("#scr").innerHTML = score;
}

var Timer = 60;
function runtimer(){
    var timerint = setInterval(function(){
        if(Timer > 0){
            Timer--;
            document.querySelector("#timerval").textContent = Timer;
        } else {
            clearInterval(timerint);
            document.querySelector("#pbtm").innerHTML = "";
            alert("The Score is "+score);
        }
    }, 1000);
}

var hitNumber;
function hitf(){
    hitNumber = Math.floor(Math.random() * 10); // Update hitNumber here
    document.querySelector("#hit").textContent = hitNumber;
}

document.querySelector("#pbtm").addEventListener("click", function(dets){
    var clickedNumber = Number(dets.target.textContent);
    if(clickedNumber === hitNumber){
        incrScore();
        hitf(); // Change the hit number before making new bubbles
        makeBubble();
    }
});

hitf();
runtimer();
makeBubble();
