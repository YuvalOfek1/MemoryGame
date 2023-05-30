const images = [
    './images/1.png',
    './images/2.png',
    './images/3.png',
    './images/4.png',
    './images/5.png',
    './images/6.png',
    './images/7.png',
    './images/8.png',
    './images/9.png',
    './images/10.png',
    './images/11.png',
    './images/12.png',
    './images/13.png',
    './images/14.png',
    './images/15.png',
    './images/16.png',
    './images/17.png',
    './images/18.png',
    './images/19.png',
    './images/20.png',
    './images/21.png',
    './images/22.png',
    './images/23.png',
    './images/24.png',
    './images/25.png',
    './images/26.png',
    './images/27.png',
    './images/28.png',
    './images/29.png',
    './images/30.png',
    './images/31.png',
    './images/32.png',
    './images/33.png',
    './images/34.png',
    './images/35.png',
    './images/36.png',
    './images/37.png',
    './images/38.png',
    './images/39.png',
    './images/40.png'
    


]

let hasTriedToFlipFirstTime = false;
let cards = []
let matchedCards = []
let flippedCards = []
let myInterval;
let paused = false;
let secondsAfterPaused=0;
let minutesAfterPaused=0;
let playerName;
const backSideImage = './images/backside.png';
let allCards = [];

$('#game-container').addClass('hidden');
$('#winning-container').addClass('hidden');
let numOfPairs = 2;

$('#game-form').on('submit',(e)=>{
    $('#game-container').removeClass('hidden');
    $('#game-form').addClass('hidden');
    playerName = $('#player-name-input').val();
    console.log(playerName)
    const pairs = $('#card-pairs-input').val();
    numOfPairs=pairs;
    console.log(numOfPairs);
    $('#greeting-player-name').text(`Good Luck, ${playerName.slice(0,1).toUpperCase()}${playerName.slice(1, playerName.length).toLowerCase()}!`);
    e.preventDefault();
    initBoard(numOfPairs);
})

$(document).ready(()=>{
    $('#resume-btn').addClass('hidden');
    $('#pause-btn').on('click',()=>{
        if(!paused){
            clearInterval(myInterval);
            paused = true;
            $('#pause-btn').addClass('hidden');
            $('#resume-btn').removeClass('hidden');
        }
        
    })

    $('#resume-btn').on('click',()=>{
        if(paused){
            startTimer();
            paused = false;
            $('#resume-btn').addClass('hidden');
            $('#pause-btn').removeClass('hidden');
        }
    })

    $('#exit-btn').on('click',()=>{
        exitGame();
    })

    $('#reset-btn').on('click',()=>{

        resetGame();

    })
        
})

const exitGame = () => {

    $('#game-container').addClass('hidden');
        $('#game-form').removeClass('hidden');
        $('#board-container').empty();
        clearInterval(myInterval);
        paused = false;
        secondsAfterPaused=0;
        minutesAfterPaused=0;
        $('#resume-btn').addClass('hidden');
        $('#pause-btn').removeClass('hidden');
        $('#player-name-input').val('');
        $('#card-pairs-input').val('');
        hasTriedToFlipFirstTime = false;
        $('#time').html('');

}
const resetGame = () => {
    $('#board-container').empty();
        clearInterval(myInterval);
        paused = false;
        secondsAfterPaused=0;
        minutesAfterPaused=0;
        $('#resume-btn').addClass('hidden');
        $('#pause-btn').removeClass('hidden');
        hasTriedToFlipFirstTime = false;
        $('#time').html('');
        initBoard(numOfPairs);
}
const startTimer = ()=>{
    myInterval = setInterval(()=>{
        secondsAfterPaused++;
        if(secondsAfterPaused === 60){
            secondsAfterPaused = 0;
            minutesAfterPaused++;
        }
        if(minutesAfterPaused === 60){
            minutesAfterPaused = 0;
        }
        $('#time').html(`<div id="time-text"><span><h3>Minutes: ${minutesAfterPaused}</h3></span> <span><h3>Seconds: ${secondsAfterPaused}<h3></span></div>`)
    }, 1000)
}

const initBoard = (numOfPairs) => {
    randomImages = getRandomImages(images, numOfPairs);
    shuffledImages = shuffleImages(randomImages);
    console.log(shuffledImages)
    for(let i = 0; i < shuffledImages.length; i++) {
        const card = $('<div>').addClass('card');
        card.addClass('m-3');
        const front = $('<div>').addClass('front');
        const back = $('<div>').addClass('back');
        const frontImage = $(`<img src="${shuffledImages[i]}" alt="fail">`)
        
        const backImage = $('<img>').attr('src', backSideImage);
        front.append(backImage);
        back.append(frontImage);
        card.append(front);
        card.append(back);
        
        $('#board-container').append(card);
    }
    allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.addEventListener('click',()=> {
        if(paused) return;
        if(matchedCards.includes(card)) return;
        flipCard(card)
        if(!hasTriedToFlipFirstTime){
            $('#time').html(`<div id="time-text"><span><h3>Minutes: ${0}</h3></span> <span><h3>Seconds: ${0}<h3></span></div>`)
            startTimer();
            hasTriedToFlipFirstTime = true;
        }
    }));
    
}



const getRandomImages = (array, numOfPairs)=> {
    let randomImages = [];
    while(randomImages.length < numOfPairs) {
        let random = Math.floor(Math.random() * array.length);
            randomImages.push(array[random]);
    }
    return randomImages

}

const shuffleImages = (array) => {
    let shuffeled = array;
    shuffeled = shuffeled.concat(shuffeled).sort(()=> Math.random() - 0.5);
    for(let i=0;i<shuffeled.length;i++){
        shuffeled = shuffeled.sort(()=> Math.random() - 0.5);
    }

    return shuffeled;
}

const flipCard = (card) => {
    console.log(card)
    if(flippedCards.length === 2) return;
    card.classList.add('flip');
    flippedCards.push(card);
    if(flippedCards.length === 2) {
        checkForMatch();
    }
}

const checkForMatch = () => {
    const firstCard = flippedCards[0].querySelector('.back img').getAttribute('src');
    const secondCard = flippedCards[1].querySelector('.back img').getAttribute('src');
    if(firstCard === secondCard) {
        flippedCards[0].classList.add('match');
        flippedCards[1].classList.add('match');
        matchedCards.push(flippedCards[0]);
        matchedCards.push(flippedCards[1]);
        flippedCards = [];
        checkForWin();
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('flip');
            flippedCards[1].classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

const checkForWin = () => {
    if(matchedCards.length === allCards.length) {
        showWinningMessage();
    }
}

const showWinningMessage = () => {

    //hide all the component with sliding up animation and slide down the winning-container
    $('#board-container').slideUp(1000);
    $('#game-container').slideUp(1000);
    $('#winning-container').html(`<h1>Congratulations!</h1><h2>You won!</h2><h3>It took you ${minutesAfterPaused} minutes and ${secondsAfterPaused} seconds to win!</h3>
    <button id="play-again-btn" class="btn btn-primary">Play Again</button>
    <input type="number" id="pairs-input" placeholder="Number of Pairs" min="2" max="30" required>
    `)
    $('#winning-container').fadeIn(2000);
    $('#winning-container').removeClass('hidden');
    $('#play-again-btn').on('click',()=>{
        numOfPairs = $('#pairs-input').val();
        $('#winning-container').addClass('hidden');
        $('#board-container').removeClass('hidden');
        $('#board-container').empty();
        $('#game-container').show();
        initBoard(numOfPairs);
        resetGame();
    
    })
}