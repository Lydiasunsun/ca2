let canvas;
let context;
let threshold = 50;
let points =[];
            
let fpsInterval = 1000 / 60; // the denominator is frames-per-second
let now;
let then = Date.now();
                
document.addEventListener("DOMContentLoaded", init, false);
            
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");  
 
    draw();
}
            
function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
      
//     let p={
//         x:randint(0,500),
//         y:randint(0,500),
// };    
    
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    let q={
        x:randint(0,500),
        y:randint(0,500),
}; 
    for (let p of points){
              let distance= Math.sqrt((q.x-p.x)**2+(q.y-p.y)**2);
            //   console.log(distance)
            //   if (dist(p,q) < threshold){
                if (distance< threshold){
                            context.fillStyle='black';
                            context.beginPath();
                            context.moveTo(p.x,p.y);
                            context.lineTo(q.x,q.y);
                            context.stroke();  
              }               
    }
    points.push(q)
    // console.log(p)
    // console.log(q) 
    // console.log(points)
}

// function dist(p,q){
//     return Math.sqrt((q.x-p.x)**2+(q.y-p.y)**2);

// }

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}


