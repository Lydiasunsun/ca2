let canvas;
let context;


let fpsInterval = 1000 /30;
let now;
let then = Date.now();

let player ={
              x:0,
              y:0,
              width:24,
              height: 32,
              frameX:0,
              frameY:0,
              xChange:0,
              yChange:0,
            //   size:10
            //   scale:2,
            //   in_air:false
};
let humans = [];





let floor;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let playerImage = new Image();
let backgroundImage = new Image();
let humanImage = new Image();



let tilesPerRow =6;
let tileSize = 16;

let background = 
    [[0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, -1, -1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, , -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
     [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    //  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
    //  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
     [ 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
    ]
];
     //这个list of list 是整个background 的每个位置，数字代表背景图片上相应数字位置的图片被放置在背景的哪里。-1代表着无背景图片，只显示背景颜色。 那么如何划分canvas的格子和如何划分背景图片的格子就很重要。 
    document.addEventListener('DOMContentLoaded',init,false);

     function init(){
              canvas =document.querySelector('canvas');
              context=canvas.getContext('2d');

            //   floor= canvas.height -27;
              player.x = canvas.width/2;
              player.y=canvas.height/2;
            

              playerImage.src='devil.png';
              backgroundImage.src='castel.png';
              humanImage.src='human.png';
            
              
    window.addEventListener('keydown',activate,false);
    window.addEventListener('keyup',deactivate,false);
    draw();
   
    // load_assets([
    //          { 'var':playerImage,'url':'devil.png'},
    //          { 'var':backgroundImage,'url':'castel.png'},
    //         //  { 'var':humanImage,'url':'human.png'}
    // ],draw); //这个是为了防止在图片下载完成之前 js就开z始工作
}

function draw(){
              window.requestAnimationFrame(draw);
              let now = Date.now();
              let elapsed = now - then;
              if (elapsed <= fpsInterval) {
                            return;
              }
              then = now - (elapsed % fpsInterval);
            //   for (let i =0;i<10;i+=1){
                if(humans.length<10){
                let human = {
                               x:canvas.width,
                               y:randint(0,canvas.height),
                               xChange:randint(-4,0),
                               yChange:randint(0,10),
                               size:10,
                               frameX:0,
                               frameY:3,
                               width:24,
                               height: 32,
                               
                };
                    humans.push(human);
                }
//Draw background on canvas
context.clearRect(0,0,canvas.width,canvas.height);
context.fillStyle = "green";
context.fillRect(0,0,canvas.width,canvas.height);
//context


for (let human of humans){
    // context.fillStyle='white';
// context.fillRect(human.x,human.y,human.size,human.size);

context.drawImage(humanImage,
    human.width*human.frameX,human.height*human.frameY,human.width,human.height,
    human.x,human.y,human.width,human.height);
    human.x=human.x+human.xChange
human.frameX=(human.frameX+1)%3;
 
}     

for(let r=0;r<20;r+=1){
              for(let c=0;c<32;c+=1){
                            let tile = background[r][c];

                            if(tile>=0){
                                          let tileRow =Math.floor(tile/tilesPerRow);
                                          let tileCol=Math.floor(tile % tilesPerRow);
                                          context.drawImage(backgroundImage,
                                                        tileCol*tileSize,tileRow*tileSize,tileSize,tileSize,
                                                        c*tileSize,r*tileSize,tileSize,tileSize);
                            }
              }
}

//draw player  注意这里不是{}
//context.fillStyle=‘red'；
// context.fillRect（player.x，player.y，player.eidth，player.height）；
context.drawImage(playerImage,
   player.width*player.frameX,player.height*player.frameY,player.width,player.height,
   player.x,player.y,player.width,player.height);




// if ((moveLeft ||moveRight) &&! 
// (moveRight && moveLeft) &&! player.in_air){
//     player.frameX=(player.frameX+1)%3;
// }
if (moveDown||moveUp||moveLeft||moveRight){
    player.frameX=(player.frameX+1)%3;
}
//Draw another object

// handle key press
if(moveLeft){
    //player.xChange =-2;
    player.xChange=player.xChange-0.5;
    player.frameY=3;
}
if(moveRight){
    //player.xchang=2
    player.xChange=player.xChange+0.5;
    player.frameY=1;
}
if(moveUp){
    //player.xChange =-2;
    player.yChange=player.yChange-0.5;
    player.frameY=0;
}
if(moveDown){
    //player.xChange =-2;
    player.yChange=player.yChange+0.5;
    player.frameY=2;
}
// if(moveUp &&! player.in_air){
//     player.yChange=player.yChange-20;
//     player.in_air=true;
//     player.frameY=2;
// }
              
//update the player
player.x=player.x+player.xChange;
player.y=player.y+player.yChange;

//update the other object

//physics
// player.yChange=player.yChange+1.5;//gravity
player.xChange=player.xChange*0.9;
player.yChange=player.yChange*0.9; //friction

//Collisions
// if (player.y+player.height>floor)//y 大的在下面
// {   player.in_air=false;
//     player.y=floor-player.height;
//     player.yChange=0;
// }

//going off left or right
// if(player.x+player.width<0){
//     player.x=canvas.width;
// }else if(player.x>canvas.width){
//     player.x=-player.width;
// }


 
}





function activate(event){
    let key = event.key;
    if (key === 'ArrowLeft'){
        moveLeft =true;
    }else if (key === 'ArrowUp'){
        moveUp =true;
    }else if (key ==='ArrowRight'){
        moveRight =true;
    }else if (key ==='ArrowDown'){
        moveDown=true;
    }
}

function deactivate(event){
    let key =event.key;
    if(key==="ArrowLeft"){
        moveLeft = false;
    }else if (key ==='ArrowUp'){
        moveUp=false;
    }else if (key==='ArrowRight'){
        moveRight=false;
    }else if(key ==='ArrowDown'){
        moveDown=false;
    }
}

function load_assets(assets,callback){
              let num_assets = assets.length;
              let loaded = function(){
                            console.log('loaded');
                            num_assets=num_assets-1;
                            if(num_assets===0){
                                          callback();
                            }
              };
              for(let asset of assets){
                let element =asset.var;
                if (element instanceof HTMLImageElement){
                    console.log('img');
                    element.addEventListener('load',loaded,false);
                }
                else if( element instanceof HTMLAudioElement){
                    crossOriginIsolated.log('audio');
                    element.addEventListener('canplaythrough',loaded,false);
                }
                element.src = asset.url;
              }
}

function randint(min,max){
    return Math.round(Math.random()*(max-min))+min;
}
