const playButton = document.getElementById('play')
const resultDiv = document.getElementById('result')
const p1NameDiv = document.getElementById('p1Name')
const p2NameDiv = document.getElementById('p2Name')
const p1HealthDiv = document.getElementById('p1Health')
const p2HealthDiv = document.getElementById('p2Health')
const gameMessage=document.querySelector("#message")

/*
To Do (28th Sept)
- assign different heal and punch audios to different players
- add player parameter inside the class functions to update the dom from within it
- add win and loss game logic
- add restart game logic
*/
class player{
    constructor(name){
        this.name=name
        this.health=100
        this.attackDamage=10    
        this.healPower=11
    }
    heal(){
        const heal=Math.floor(Math.random()*this.healPower)+1
        if(this.health<100){
            this.health+=heal
        }
        if(this.health>100){
            this.health=100
        }
    }
    damageByStrike(enemy){
        const strikeStat=Math.floor(Math.random()*this.attackDamage)+1
        enemy.health-=strikeStat
    }
}

const player1=new player(prompt('Enter Player 1 name','Player 1'))
const player2=new player(prompt('Enter Player 2 name','Player 2'))
p1NameDiv.textContent=`${player1.name}`
p2NameDiv.textContent=`${player2.name}`

document.addEventListener('keyup',function commands(e){
    hitcommands(e.code)
    playSequence(`${e.code}`)
    if(player1.health<=0){
        document.removeEventListener('keyup',commands)
        resultDiv.textContent=`${player2.name} Wins`
        p1HealthDiv.textContent=`0`
        playWinSequence()
        restart()
    }
    else if(player2.health<=0){
        document.removeEventListener('keyup',commands)
        resultDiv.textContent=`${player1.name} Wins`
        p2HealthDiv.textContent=`0`
        playWinSequence()
        restart()
    }
})

function updateDOM(p1,p2){
    p1HealthDiv.textContent=p1.health
    p2HealthDiv.textContent=p2.health
}

function playSequence(keyPressed){
    let audio=new Audio(`/sounds/${keyPressed}.mp3`)
    audio.play()
}

function playWinSequence(){
    let audio=new Audio('/sounds/victory.mp3')
    audio.play()
}

function restart(){
    gameMessage.innerHTML=
    `
    <h1>To reset game, press Enter</h1>
    `
    document.addEventListener('keydown',(e)=>{
        if(e.code==='Enter'){
            location.reload()
        }
        else{
            //do nothing
        }
    })
}

function hitcommands(eCode){
    if(eCode==='KeyQ'){
        player1.damageByStrike(player2)
        p2HealthDiv.textContent=`${player2.health}`
    }
    else if(eCode==='KeyA'){
        player1.heal()
        updateDOM(player1,player2)
    }
    else if(eCode==='KeyP'){
        player2.damageByStrike(player1)
        updateDOM(player1,player2)
    }
    else if (eCode==='KeyL'){
        player2.heal()
        updateDOM(player1,player2)
    }
    else{
        //do nothing
    }
}