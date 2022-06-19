let buttonColours = ['red', 'blue', 'green', 'purple'];
let gamePattern = [];
let userClickedPattern = [];
let firstPress = false;
let level = 0;



function nextSequence() {
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);

    let audio = new Audio('sounds/' + randomChosenColour +'.mp3');
    audio.play(); 

    level++;
    $('h1').text('Level ' + level);

    userClickedPattern = []
}

function playSound(name) {
    let audio = new Audio('sounds/' + name +'.mp3');
    audio.play(); 
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed'),
        100})
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence(), 1000);
        }
    } else {
        let wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart').css('color', 'black');
        startOver()
    }
}

function startOver() {
    level = 0
    firstPress = false 
    gamePattern = []
}

$('.btn').click(function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);  
})

$('body').keydown(function() {
    if(firstPress == false) {
        $('h1').text('Level 0');
        nextSequence();
        firstPress = true;
        $('body').removeClass('game-over');
    } 
})

