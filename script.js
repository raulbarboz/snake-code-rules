console.log('loaded v1.0');

//variables
let x, y, w, h, snakePosition, direction, newSnake, newComida, foodX, foodY;

snakePosition = [
    {x:20, y:20},
    {x:40, y:20},
    {x:60, y:20},
    {x:80, y:20},
    {x:100, y:20}
]

foodX = Math.floor(Math.random() * 20) * 20;
foodY = Math.floor(Math.random() * 20) * 20;
w = 400;
h = 400;
x = 20;
y = 20;
direction = 'RIGHT';



// carregar o canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


// criar o objeto snake

class Snake {
    constructor(snakePosition, x, y, direction, w, h, foodX, foodY){
        this.snakePosition = snakePosition;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.w = w;
        this.h = h;
        this.foodX = foodX;
        this.foodY = foodY;
    }

    draw(){
        snakePosition.map((pos) => {
            ctx.fillStyle = "black";
            ctx.fillRect(pos.x, pos.y, x, y)
        })
    }

    walk(){
        //create newPosition

        let newPos = {

        }

        if(direction === 'RIGHT'){
            newPos.x = snakePosition[snakePosition.length - 1].x + 20;
            newPos.y = snakePosition[snakePosition.length - 1].y;
        }else if (direction === 'LEFT'){
            newPos.x = snakePosition[snakePosition.length - 1].x - 20;
            newPos.y = snakePosition[snakePosition.length - 1].y;
        }else if (direction === 'UP'){
            newPos.x = snakePosition[snakePosition.length - 1].x;
            newPos.y = snakePosition[snakePosition.length - 1].y - 20;
        }else if (direction === 'DOWN'){
            newPos.x = snakePosition[snakePosition.length - 1].x;
            newPos.y = snakePosition[snakePosition.length - 1].y + 20;
        }

        
       snakePosition.shift();
       snakePosition.push(newPos);

    }

    checkHit() {
        if(snakePosition[snakePosition.length - 1].x === foodX && snakePosition[snakePosition.length - 1].y === foodY){
            foodX = Math.floor(Math.random() * 20) * 20;
            foodY = Math.floor(Math.random() * 20) * 20;
            snakePosition.unshift({
                x:snakePosition[0].x,
                y:snakePosition[0].y
            })
        }
        if(snakePosition[snakePosition.length - 1].x > w 
            || snakePosition[snakePosition.length - 1].x < 0 
            || snakePosition[snakePosition.length - 1].y > h 
            || snakePosition[snakePosition.length - 1].y < 0){
            ctx.clearRect(0,0,400,400)
            snakePosition = [
                {x:20, y:20},
                {x:40, y:20},
                {x:60, y:20},
                {x:80, y:20},
                {x:100, y:20}
            ]
            direction = 'RIGHT';
        }
        let snakePositionCopy = snakePosition.concat()
        let snakePositionNew = snakePositionCopy.pop();
        
        snakePositionCopy.map((pos) => {
            if(snakePositionNew.x === pos.x && snakePositionNew.y === pos.y) {
                console.log('hit body')
            }
        })
    }

    init() {
        this.checkHit();
        this.draw()
        this.walk()
    }

}

// criar o objeto comida

class Comida {
    constructor(foodX, foodY){
        this.foodX = foodX;
        this.foodY = foodY;
    }
    draw(){
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(foodX, foodY, 20, 20);
    }
}

// modificar direções a partir de ações do teclado
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if(keyName === 'ArrowDown' && direction !== 'UP'){
        direction = 'DOWN';
    }
    if(keyName === 'ArrowUp' && direction !== 'DOWN'){
        direction = 'UP';
    }
    if(keyName === 'ArrowLeft' && direction !== 'RIGHT'){
        direction = 'LEFT';
    }
    if(keyName === 'ArrowRight' && direction !== 'LEFT'){
        direction = 'RIGHT';
    }
});

newSnake = new Snake(snakePosition, x, y, direction, w, h, foodX, foodY);
newComida = new Comida();

// funcao para atualizar requestKeyFrame()
function init(){
    newSnake.init();
    newComida.draw();
}

setInterval(() => {
    ctx.clearRect(0,0,400,400)
    init()
}, 300)

init()