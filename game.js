var buttonColors, gamePattern, userClickedPattern, gameStarted, level;

function initialize() {
    buttonColors = ["red", "green", "blue", "yellow"];
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

initialize();

function nextSequence() {
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    userClickedPattern = [];
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text(`Level ${level}`);
}

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(color) {
    console.log(color);
    if (color == gamePattern[userClickedPattern.length-1] ) {
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function () {
                nextSequence()}, 1000);
        }
    } 
    else gameOver();
}

function gameOver (){
    playSound("wrong");
    $("h1").text("Game Over!");
    $("body").css("background-color", "red");
    setTimeout(function() {
        $("body").css("background-color", "#011F3F")
    }, 100);
    setTimeout(function (){
        $("h1").text("Press Any Key to Start");
    }, 2000);
    initialize();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function (){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100)
}

$(".btn").click(function (){
    buttonPressedId = this.id;
    userClickedPattern.push(buttonPressedId);
    playSound(buttonPressedId);
    animatePress(buttonPressedId);
    checkAnswer(buttonPressedId);
});

$(document).keypress(function (event) {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
})
