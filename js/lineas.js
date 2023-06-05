const statu_display=document.querySelector('.game-notification');
Game_state=['','','','','','','','',''],
WINNING=[
    [0 ,1, 2],
    [3 ,4, 5],
    [6 ,7, 8],
    [0 ,3, 6],
    [1 ,4, 7],
    [2 ,5, 8],
    [0 ,4, 8], 
    [2 ,4, 6]
];
WIN_MESSAGE=()=>`El Jugador ${currentPlayer} ha ganado!`,
DRAW_MESSAGE=()=>`El Juego empatò!`,
CURRENT_PLAYER_TURN=()=>`Player's turn ${currentPlayer}`


let gameactive=true,
currentPlayer='O'

function main(){
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    listeners()

}


function listeners(){
 document.querySelector('.game-container').addEventListener('click',handleCellClick)
 document.querySelector('.game-start').addEventListener('click',handleRestatGame)

}
function handleStatusDisplay(message){
    statu_display.innerHTML=message
 
   }
function handleRestatGame(){
    gameactive=true
    currentPlayer='X'
    restartGame()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell=>cell.innerHTML='')
}


function handleCellClick(clickedEvent){
 const clickedCell=clickedEvent.target
 if (clickedCell.classList.contains('game-cell')) {
    const clickedCellIndex=Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if(Game_state[clickedCellIndex] !== ''|| !gameactive){
      return false
    }

    handledCellPlayed(clickedCell,clickedCellIndex)
    handleResultValidation()

 }

}

function handledCellPlayed(clickedCell,clickedCellIndex){
Game_state[clickedCellIndex]=currentPlayer
clickedCell.innerHTML=currentPlayer
}

function handleResultValidation() {
    let roundWon =false;
    for(let i =0 ;i < WINNING.length;i++){
        const winCondition = WINNING[i]
        let positio1=Game_state[winCondition[0]],
         positio2=Game_state[winCondition[1]],
         positio3=Game_state[winCondition[2]]
        if(positio1===''||positio2===''||positio3===''){
            continue;
        }
        if(positio1===positio2 && positio2===positio3){
           roundWon=true
           break
        }


    }
    if ( roundWon) {
        handleStatusDisplay(WIN_MESSAGE())
        gameactive=false
        return
    }

    let roundDraw= !Game_state.includes('')
    if (roundDraw) {
        handleStatusDisplay(DRAW_MESSAGE())
        gameactive=false
        return
    }

    handlePlayerChange()
}

function  handlePlayerChange(){
    currentPlayer=(currentPlayer ==='X')?'O' :'X'
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}
function restartGame(){
    let i =Game_state.length
    while(i--){
        Game_state[i] = '';
}
}

main();


let list =document.querySelectorAll('.list');
for (let i = 0; i < list.length; i++) {

    list[i].onclick =function() {
        let j=0; 
        while (j < list.length) {
            list[j++].className='list';
        } 
        list[i].className='list active'; 
    }
 
}

let menutoggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
menutoggle.onclick=function() {
    menutoggle.classList.toggle('active');
    navigation.classList.toggle('active');
};