const playButton = document.getElementById('play')
const resultDiv = document.getElementById('result')
const p1NameDiv = document.getElementById('p1Name')
const p2NameDiv = document.getElementById('p2Name')
const p1HealthDiv = document.getElementById('p1Health')
const p2HealthDiv = document.getElementById('p2Health')

class player{
    constructor(name){
        this.name=name
        this.health=100
        this.attackDamage=10
        this.healPower=11
    }
    heal(){
        const heal=Math.floor(Math.random()*this.healPower)+1
        let audio=new Audio('/sounds/quickheal.mp3')
        audio.play()
        this.health+=heal
    }
    damageByStrike(enemy){
        const strikeStat=Math.floor(Math.random()*this.attackDamage)+1
        let audio=new Audio('/sounds/quickhit.mp3')
        audio.play()
        enemy.health-=strikeStat
    }
}

const player1=new player(prompt('Enter Player 1 name','Player 1'))
const player2=new player(prompt('Enter Player 2 name','Player 2'))
p1NameDiv.textContent=`${player1.name}`
p2NameDiv.textContent=`${player2.name}`

document.addEventListener('keypress',(e)=>{
    if(e.code==='KeyQ'){
        player1.damageByStrike(player2)
        p2HealthDiv.textContent=`${player2.health}`
    }
    if(e.code==='KeyA'){
        player1.heal()
        updateDOM(player1,player2)
    }
    else if(e.code==='KeyP'){
        player2.damageByStrike(player1)
        updateDOM(player1,player2)
    }
    else if (e.code==='KeyL'){
        player2.heal()
        updateDOM(player1,player2)
    }
    else{
        //do nothing
    }
})

function updateDOM(p1,p2){
    p1HealthDiv.textContent=p1.health
    p2HealthDiv.textContent=p2.health
}