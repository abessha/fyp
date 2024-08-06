const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = document.getElementById("photo");

class home {
draw() {
    ctx.globalAlpha = 1
// wall
ctx.beginPath();
ctx.fillStyle = "#660000";
ctx.fillRect(0, 0, 800, 400);

// floor
ctx.beginPath();
ctx.fillStyle = "#1a0900";
ctx.fillRect(0, 400, 800, 450);
}
}

class focus {
    constructor() {
        this.position = {
            x:300,
            y:150
        }
        this.pan = {
            x:0,
            y:0
        }

        this.width = 2
        this.height = 2
    }

    draw() {
        ctx.fillStyle = '#FFFFFF'
        ctx.globalAlpha = 0.0
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.globalAlpha = 1
    }

    update() {
        this.draw()
        this.position.x += this.pan.x
    }

}

class help {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        this.pan = {
            x:0,
            y:0
        }
    }
    draw() {
        ctx.globalAlpha = 1
        ctx.drawImage(img, this.position.x, this.position.y, 120,260);
    }
    checkHelp(x, y) {
        if (x > this.position.x &&  x < (this.position.x+120) && y > this.position.y &&  y < (this.position.y+260)) {
            return true;
        } 
    }
}

class elevator {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 230
        this.height = 300
    }

    draw() {
        ctx.globalAlpha = 1
        ctx.strokeStyle = 'black';
        ctx.rect(this.position.x, this.position.y, 230, 300);
        ctx.stroke();   
        ctx.fillStyle = 'grey';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        
        ctx.lineWidth = "2";
        ctx.moveTo((this.position.x + 115), this.position.y);
        ctx.lineTo((this.position.x + 115), (this.position.y + this.height));
        ctx.stroke();
    }

    checkClick(x, y) {
        if (x > this.position.x &&  x < (this.position.x+230) && y > this.position.y &&  y < (this.position.y+300)) {
            return true;
        } 
    }
}

const game = new home()
const topics = [new elevator({x:430, y:100}), new elevator({x:850, y:100}), new elevator({x:1270, y:100})]
const point = new focus()
const howTo = new help({x:140, y:160})
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let count = 0

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    game.draw()
    howTo.draw()
    topics.forEach(topic => {
        topic.draw()
    })
    point.update()

    if (keys.right.pressed && point.position.x < 325) {
        point.pan.x = 1
    } else if (keys.left.pressed && point.position.x > 300) {
        point.pan.x = -1
    } else {
        point.pan.x = 0

        if(keys.right.pressed && count < 1250) {
            topics.forEach(topic => {
                topic.position.x -= 2
                howTo.position.x -= 1
                count += 1
            })
        } else if (keys.left.pressed && count > 0) {
            topics.forEach(topic => {
                topic.position.x += 2
                howTo.position.x += 1
                count -= 1
            })
        }
    }
}

animate()

window.addEventListener('keydown', ({keyCode}) =>{
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
        break
    }
})

window.addEventListener('keyup', ({keyCode}) =>{
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
        break
    }
})

topics.forEach(topic => {
    window.addEventListener('click', e => {
        let x = e.clientX;
        let y = e.clientY;

        if (topic.checkClick(x,y)) {
            if (x > topics[0].position.x &&  x < (topics[0].position.x + 230) && 100 < y &&  y < 400){
                console.log('elevator 1')
                window.location.href = '../frontend/ele1.html'
            } else if (x > topics[1].position.x &&  x < (topics[1].position.x + 230) && 100 < y &&  y < 400){
                console.log('elevator 2')
                window.location.href = '../frontend/ele2.html'
            } else if (x > topics[2].position.x &&  x < (topics[2].position.x + 230) && 100 < y &&  y < 400){
                console.log('elevator 3')
                window.location.href = '../frontend/ele3.html'
            }
        }       
    })   
})

var howToText = document.getElementById('help')
var close = document.getElementsByClassName("close")[0]

window.addEventListener('click', e => {
    let x = e.clientX;
    let y = e.clientY;

    if (howTo.checkHelp(x,y)) {
        if (x > howTo.position.x &&  x < (howTo.position.x + 120) && 220 < y &&  y < 400){
            console.log('help')
            howToText.style.display = "block";
        }    
    }  
    
      // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
    howToText.style.display = "none";
  }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == howToText) {
        howToText.style.display = "none";
        }
    }
})