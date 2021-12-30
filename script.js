"use strict"

let winningPara= document.createElement("p")
    winningPara.className="winner"

// document.body.appendChild(playButton)



let gameArea={   // gameArea is an objectoriented list 
    canvas :document.createElement("canvas"),
    drawCanvas : function(){
        this.canvas.width= 700
        this.canvas.height= 300
        this.context=this.canvas.getContext("2d")
        document.body.appendChild(this.canvas)
       // document.body.insertBefore(this.canvas, document.body.childNodes[0])
       this.interval= setInterval(updateGameArea,20) // updates every 20 milliseconds

        this.frameNo=0

        window.addEventListener('keydown', function (keyEvent) {
            gameArea.keys=(gameArea.keys||[])
            gameArea.keys[keyEvent.key] =true
        })
        window.addEventListener('keyup', function (keyEvent) {
            gameArea.keys[keyEvent.key]=false
        })
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    },// clear function is here because it clears the canvas and the canvas is made here
    stopGame: function(){
        clearInterval(this.interval)

        setTimeout(resetGame,2000)


        
    }
}
let greySpike = []
let redCube ;
let yellowCube;

function startGame(){ // startGame invokes the drawCanvas method from the gameArea object
    gameArea.drawCanvas()
    redCube= new component(40,30,"gamePics/blueFish.png",10,185,"image")
    yellowCube= new component(40,30,"gamePics/yellowFish.png",10,100,"image");
    
    
}

function component(width, height, color,x,y, type){
    this.type= type
    if(type=="image"){
        this.image= new Image()
        this.image.src=color
    }
    this.width=width
    this.height=height
    this.x=x
    this.y=y
    this.speedX=0
    this.speedY=0
    this.update= function(){// update is here because its making a new protagonist everytime
        let ctx=gameArea.context;
        if(type=="image"){
            ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,this.height
                )
        }
        else {ctx.fillStyle=color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        }
    }
    this.newPosition= function(){
        this.x+=this.speedX
        this.y+=this.speedY

        
    }
    this.cubeHits= function(obstacle){
        let cubeLeft=this.x
        let cubeRight=this.x+this.width
        let cubeTop=this.y
        let cubeBottom= this.y+this.height

        let obstacleLeft=obstacle.x
        let obstacleRight = obstacle.x+obstacle.width
        let obstacleTop= obstacle.y
        let obstacleBottom=obstacle.y+obstacle.height

        let hit= true

        if( cubeBottom < obstacleTop || cubeTop > obstacleBottom || cubeRight<obstacleLeft || cubeLeft>obstacleRight){
            hit=false
        }
        return hit
    }
    
}

function updateGameArea(){

    let x,y;
    for(let i=0;i<greySpike.length;i+=1) {
        if(redCube.cubeHits(greySpike[i])){
            gameArea.stopGame()
           
            winningPara.innerHTML="Player 1 wins!"
            document.body.appendChild(winningPara)
            
            return
        }
        else if(yellowCube.cubeHits(greySpike[i])){
            gameArea.stopGame()
            winningPara.innerHTML="Player 2 wins!"
            document.body.appendChild(winningPara)
        }
    }
    gameArea.clear()

    gameArea.frameNo+=1
    if(gameArea.frameNo==1 || everyInterval(150)){
        x=gameArea.canvas.width;
        let minHeight=20;
        let maxHeight=200;
        let height= Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);

        let minGap=50;
        let maxGap=200
        let gap=Math.floor(Math.random()*(maxGap-minGap+1)+minGap)
        greySpike.push(new component(10,height,"green",x,0))
        greySpike.push(new component(10,x-height-gap,"green",x,height+gap))
        
    }
    for (let i=0;i<greySpike.length;i+=1){
        greySpike[i].x+=-1
        greySpike[i].update();
    }
    redCube.newPosition()
    redCube.update()
    yellowCube.newPosition()
    yellowCube.update()
    document.getElementById("song").play()

    function everyInterval(n){
        if ((gameArea.frameNo /n)%1==0){
            return true
        }
        return false
    }
    
    redCube.speedX=0
    redCube.speedY=0
    yellowCube.speedX=0
    yellowCube.speedY=0

    
    
    if (gameArea.keys && gameArea.keys["ArrowUp"]) { redCube.speedY = -1}
    if (gameArea.keys && gameArea.keys["ArrowDown"]){redCube.speedY=1}
    if (gameArea.keys && gameArea.keys["ArrowRight"]){redCube.speedX=1}
    if (gameArea.keys && gameArea.keys["ArrowLeft"]){redCube.speedX=-1}

    if (gameArea.keys && gameArea.keys["w"]) {yellowCube.speedY = -1 }
    if (gameArea.keys && gameArea.keys["s"]){yellowCube.speedY=1}
    if (gameArea.keys && gameArea.keys["d"]){yellowCube.speedX=1}
    if (gameArea.keys && gameArea.keys["a"]){yellowCube.speedX=-1}

    
        
    
}

function resetGame(){
    location.reload()
}
//canvas.addEventListener("keydown",moveGuy, true)

// function moveGuy(keyEvent){
//     if(keyEvent.keyCode==38){
//         clear()
//         protagonist.y-=1
//         protagonist.update()
//     }
// }
