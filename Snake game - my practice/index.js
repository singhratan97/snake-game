const grid = document.getElementById("grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const gameOver = document.getElementById("game-over")
const close = document.getElementById("close")
const modal = document.getElementById("modal")
let width = 20
let squares = []
let snake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
const increaseSpeed = 0.9
let speed = 1000
let timerId = 0
let movement = true

function createGrid() {
    for (let i = 0; i < width*width; i++){
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
        
    }
}
createGrid()


snake.forEach(i=>squares[i].classList.add("snake"))


startButton.addEventListener("click",function(){
    snake.forEach(i=>squares[i].classList.remove("snake"))
    if(appleIndex)
    squares[appleIndex].classList.remove("apple")
    clearInterval(timerId)
    snake = [2,1,0]
    direction = 1
    speed = 1000
    score = 0
    scoreDisplay.textContent = score
    snake.forEach(i=>squares[i].classList.add("snake"))
    generateApple()
    timerId = setInterval(move,speed)
})


function move() {
    startButton.style.color = "red"
    startButton.disabled = true
    
    if(
        //if snake hits right wall
        (snake[0]%width === width-1 && direction === 1) ||
        //if snake hits left wall
        (snake[0]%width === 0 && direction === -1) ||
        //if snake hits top wall
        (snake[0]-width <0 && direction === -width) ||
        //if snake hits bottom wall
        (snake[0]+width >= width*width && direction === width) ||
        //snake hits itself
        (squares[snake[0]+direction].classList.contains("snake"))
       )
       {
            console.log("game over")
            startButton.style.color = "rgb(53, 148, 95)"
            gameOver.style.display = "block"
            startButton.disabled = false
            return clearInterval(timerId)
        }
   
    let tail = snake.pop()
    squares[tail].classList.remove("snake")
    snake.unshift(snake[0] + direction)
    squares[snake[0]].classList.add("snake")

    if(squares[snake[0]].classList.contains("apple"))
    {
        squares[appleIndex].classList.remove("apple")
        squares[tail].classList.add("snake")
        snake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        speed = speed *  increaseSpeed
        timerId = setInterval(move,speed)
    }

    movement = true
}



function generateApple() {
    do{
        appleIndex = Math.floor(Math.random() * 400)
    }while(squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}


document.addEventListener("keydown", function (e) {
    console.log(e)
    if(movement) {
        if(e.key === "ArrowUp" && direction != width) {
            console.log("ArrowUp pressed")
            direction = -width
            
        } else if(e.key === "ArrowDown" && direction != -width) {
            console.log("ArrowDown pressed")
            direction = +width
           
        } else if(e.key === "ArrowLeft" && direction != 1) {
            console.log("ArrowLeft pressed")
            direction = -1
           
        } else if(e.key === "ArrowRight" && direction != -1) {
            console.log("ArrowRight pressed")
            direction = 1
    
        }
        movement = false
    }

})


close.addEventListener("click", function() {
    gameOver.style.display = "none"
})