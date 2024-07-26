
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses : 0,
    ties: 0
};
 
updateScore();
/* if(!score){

    score ={
        wins: 0,
        losses : 0,
        ties: 0
    };
}*/
let isAutoPlaying = false;
let intervalId;

//const autoPlay = () =>{

//};

document.querySelector('.js-rock-button').addEventListener('click' , ()=>{
      playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click' , ()=>{
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click' , ()=>{
    playGame('scissors');
});

document.querySelector('.js-reset').addEventListener('click' , ()=>{
  resetScore();
});

document.querySelector('.js-autoplay-button').addEventListener('click' , ()=>{
    autoPlay();
});

document.body.addEventListener('keydown' , (event)=>{
    //console.log(event.key);
    if(event.key === 'r' || event.key === 'R'){
        playGame('rock');
    }

   else if(event.key === 'p' || event.key === 'P'){
    playGame('paper');
   }
   else if(event.key === 's' || event.key === 'S'){
    playGame('scissors');
   }

});



function autoPlay() 
{
    if(!isAutoPlaying){
    intervalId = setInterval(() =>{
      let playerMove = pickComputerMove();
      playGame(playerMove);
    } , 1000);

    isAutoPlaying = true;

}

else {
    clearInterval(intervalId);
    isAutoPlaying = false;
}
}

function playGame(playerMove){
 const computerMove = pickComputerMove();
 let result='';
 if(playerMove==='scissors')
 {
if(computerMove==='rock'){
    result = 'You lose';
}
else if(computerMove==='paper'){
    result='You win';
}
else if(computerMove==='scissors'){
    result = 'Tie';
}
}

else if(playerMove==='paper')
{
    if(computerMove==='rock'){
        result = 'You win';
    }
    else if(computerMove==='paper'){
        result='Tie';
    }
    else if(computerMove==='scissors'){
        result = 'You lose';
    }
}

else if(playerMove==='rock')
{
    if(computerMove==='rock'){
        result = 'Tie';
    }
    else if(computerMove==='paper'){
        result='You lose';
    }
    else if(computerMove==='scissors'){
        result = 'You win';
    }
}

if(result === 'You win'){
    score.wins += 1 ;
}
else if (result === 'You lose'){
    score.losses += 1;
}
else if(result === 'Tie'){
    score.ties += 1 ;
}

localStorage.setItem('score' , JSON.stringify(score));

updateScore();
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML =
 `Your move : ${playerMove} , Computer move: ${computerMove}`;

/*alert(`You picked ${playerMove}. Computer picked ${computerMove} . ${result}
wins : ${score.wins} , losses : ${score.losses} , tie : ${score.ties}`);*/

}

 function updateScore(){
    document.querySelector('.js-score').innerHTML =
    `wins : ${score.wins} , losses : ${score.losses} , tie : ${score.ties}`;
 }

 function resetScore(){
    clearInterval(intervalId);
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore() ;
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';

 }



  function pickComputerMove(){
    const randomNumber = Math.random() ;
    let computerMove = '' ;
    if(randomNumber >=0 && randomNumber<1/3){
        computerMove = 'rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove = 'paper' ;
    }
    else if (randomNumber>=2/3 && randomNumber<1){
        computerMove='scissors';
    }
    return computerMove ;
}
