var BG_COLOUR = '#231f20';
var SNAKE_COLOUR = '#c2c2c2';
var FOOD_COLOUR = '#e66916';
let scrolltotop = false;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var minvis = 0;

canvas.width = $( window ).width();

canvas.height = $(window).height();

//From: https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


const FR = 10;
const S = 20;
const Tx = (((canvas.width > canvas.height) ?  canvas.width : canvas.height ) / S)/1;
const Ty = (((canvas.width < canvas.height) ?  canvas.width : canvas.height ) / S)/1;

let pos, vel, food, snake;

function init(){
  pos = {x: 10, y: 10};
  vel = {x: 0, y: 0};

  snake = [
    {x: 8, y: 10},
    {x: 9, y: 10},
    {x: 10, y: 10},
  ]

  randomFood();
}

init();

function randomFood(){
  food = {
    x: Math.floor(Math.random() * (Tx/2)),
    y: Math.floor(Math.random() * (Ty/2)),
  }

  for (let cell of snake) {
    if(cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}

document.addEventListener('keydown', keydown);

function keydown(e){
  switch(e.keyCode) {
    case 37: {
      return vel = {x: -1, y: 0}
    }
    case 38: {
      return vel = {x: 0, y: -1}
    }
    case 39: {
      return vel = {x: 1, y: 0}
    }
    case 40: {
      return vel = {x: 0, y: 1}
    }
  }
}

setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 /FR);

function gameLoop(){

  let children = document.getElementsByName("hiding");





  ctx.save();



// Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  ctx.restore();
  ctx.fillStyle = BG_COLOUR;
  ctx.globalAlpha = 0.5;



  ctx.fillRect(0, 0, canvas.width, canvas.height);





  ctx.fillStyle = SNAKE_COLOUR;
  for (let cell of snake) {
    ctx.fillRect(cell.x*S, cell.y*S, S,S);
  }

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x*S,food.y*S,S,S);

  pos.x += vel.x;
  pos.y += vel.y;

  if (pos.x < 0 || pos.x > Tx || pos.y < 0 || pos.y > Ty) {
    init();
  }

  if (food.x === pos.x && food.y === pos.y) {


    //Food is eaten


    //note = notes.pop();
    //playNote(note[0], 1000 * 256 / (note[1] * tempo));


    for(let i=0; i<children.length;i++){

      if(children[i].hidden == true){
        //unhide
        children[i].hidden = false;
        scrolltotop = true;

          window.scrollTo(0,document.body.scrollHeight);


        break;
      }
    }

    if(!scrolltotop){
      window.scrollTo(0,0);
      alert("You won! Now read my resumé");
    }

    scrolltotop = false;




    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    randomFood();
  }

  if (vel.x || vel.y) {
    for (let cell of snake) {
      if (cell.x === pos.x && cell.y === pos.y) {
        return init();
      }
    }
    snake.push({...pos});
    snake.shift();
  }
}

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
      playMelody();
    }, duration);
}

function playMelody() {
  if (notes.length > 0) {


  }
}

notes = [
  [659, 4],
  [659, 4],
  [659, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4],
  [0, 4],
  [987, 4],
  [987, 4],
  [987, 4],
  [1046, 8],
  [0, 16],
  [783, 16],
  [622, 4],
  [523, 8],
  [0, 16],
  [783, 16],
  [659, 4]
];

notes.reverse();
tempo = 100;

//playMelody();
