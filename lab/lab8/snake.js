let canvas;
let context;

let fpsInterval =1000/30;
let now;
let then =Date.now();
let request_id;
let outcome=0

let food={
              x:randint(0,200),
              y:randint(0,200),
              size:10,
   };
let player_list=[]
for (let i=0;i<3;i++){
  let player ={
              // x:randint(0,150),
              // y:randint(0,150),
              // size:10,
              x: i===0 && 100||(100-10*i),
              y: randint(0,150),
              width:10,
              height:10,
              xChange:1,
              yChange:1,                     
};
player_list.push(player);
}
let moveLeft=false;
let moveRight=false;
let moveUp= false;
let moveDown=false;

document.addEventListener('DOMContentLoaded',init,false);

function init(){
              canvas = document.querySelector('canvas');
              context = canvas.getContext('2d');

              window.addEventListener('keydown',activate,false);

              draw();
}

function draw(){
              request_id = window.requestAnimationFrame(draw);
              let now = Date.now;
              let elapsed = now- then;
              if (elapsed<=fpsInterval){
                            return
              };
              then = now -(elapsed % fpsInterval);

           
              context.clearRect(0,0,canvas.width,canvas.height);
              context.fillRect(food.x,food.y,food.size,food.size);
              context.fillStyle='cyan';
              context.fillRect(player.x,player.y,player.width,player.height);
              context.fillStyle='yellow';
                       
              if(moveRight){
                            player.x=player.x+player.xChange;  
              }
              if(moveUp){
                            player.y=player.y-player.yChange;       
              }
              if(moveDown){
                            player.y=player.y+player.yChange;
              }
              if(moveLeft){
                            player.x=player.x-player.xChange;
              }
              if ((player.x+player.width>canvas.width)||player.x<0||player.y<0||player.y+player.height>canvas.height){
                stop(outcome);
                return;
              }    
              
              if (player_collides(food)){
                  food.x=randint(0,200);
                  food.y=randint(0,200);
              
                  return;
              }              
                     
}

function randint(min,max){
              return Math.round(Math.random()*(max-min))+min;
}

function activate(event){
              let key = event.key;
              if(key ==='ArrowLeft'){
                moveLeft=true;
                moveRight=false;
                moveUp=false;
                moveDown=false;
              }else if (key==='ArrowRight'){
                            moveRight=true;
                            moveLeft=false;
                            moveUp=false;
                            moveDown=false;
              }else if (key ==='ArrowUp'){
                            moveUp=true;
                            moveLeft=false;
                            moveRight=false;
                          
                            moveDown=false;
              }else if(key ==='ArrowDown'){
                            moveDown= true;
                            moveLeft=false;
                            moveRight=false;
                            moveUp=false; 
              }
}
function deactivate(event){
  let key = event.key;
  if(key ==='ArrowLeft'){
    moveLeft=false;
  }else if (key==='ArrowRight'){
                moveRight=false;
  }else if (key ==='ArrowUp'){
                moveUp=false;
  }else if(key ==='ArrowDown'){
                moveDown= false;
  }
}

function player_collides(food){
              
              if (player.x+player.width<food.x || 
                food.x+food.size <player.x ||
                            player.y+player.height<food.y || 
                            food.y+food.size<player.y) {
                            return false;           
              }else{
                   outcome=outcome+1 
                   return true;
              }
}

function stop(outcome){
  window.removeEventListener('keydown',activate,false);
  window.removeEventListener('keyup',deactivate,false);
  window.cancelAnimationFrame(request_id);
  let outcome_element = document.querySelector('#outcome');
  outcome_element.innerHTML = outcome;
}
setInterval(() => {
  let last = player_list.pop();
  let {x,y,width} =player_list[0];
  last.x=x+width;
  player_list.unshift(last);
}, 100);  
//有时候function 的括号里有pass进内容，有时候没有。 