const canvas = document.getElementById('screen')
const ctx = canvas.getContext('2d')

const levelDiv = document.getElementsByClassName('level')

const levelClear = document.getElementById('lvlClear')
const lC = levelClear.getContext('2d')

var localStorage = localStorage;
localStorage.clear();
var counter = 0;
let lost = 0;

class floorClear {
    constructor(x) {
        this.x = x
        this.y = 12
        this.r = 5
        this.start = 0
        this.end = 2
        this.clear = false
    }

    draw() {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = "10";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.start, this.end * Math.PI);
        ctx.stroke();
    }

    correct() {
      lC.strokeStyle = 'green';
      lC.lineWidth = "10";
      lC.beginPath();
      lC.arc(this.x, this.y, this.r, this.start, this.end * Math.PI);
      lC.stroke();
      this.clear = true;
  }

  incorrect() {
    lC.clearRect((this.x-10), 0, 25, 25);
    this.clear = false;
  }
}

class level{
    constructor({x,eqX,eqY,colour}) {
        this.position = {
            x,
            eqX,
            eqY,
            colour,
        }
        
        this.eqH = 18
        this.eqW = 40
    }

    draw() {
        const lvl  = levelDiv[this.position.x].getContext('2d')
        lvl.beginPath();
        lvl.strokeStyle = this.position.colour;
        lvl.lineWidth = "7";
        lvl.moveTo(this.position.eqX,this.position.eqY);
        lvl.lineTo((this.position.eqX + this.eqW),this.position.eqY);
        lvl.moveTo(this.position.eqX,(this.position.eqY + this.eqH));
        lvl.lineTo((this.position.eqX + this.eqW),(this.position.eqY + this.eqH));
        lvl.stroke();
    }
}

class screen {
    draw() {
        // wall
        ctx.beginPath();
        ctx.fillStyle = '#d1d1e0';
        ctx.fillRect(0,0, canvas.width, 450)


        ctx.fillStyle = 'grey';
        ctx.fillRect(30,30, 520, 450);
        ctx.strokeStyle = 'black';
        ctx.rect(30,30, 520, 450);
        ctx.stroke();

        ctx.lineWidth = "4";
        ctx.moveTo(290, 30);
        ctx.lineTo(290, 450);
        ctx.stroke();

    }
}


function checkHistory() {
  if (localStorage.topicClear0 === 'true'){
    complete[0].correct();
    } else {
      complete[0].incorrect();
    }
    if (localStorage.topicClear1 === 'true'){
      complete[1].correct();
      } else {
        complete[1].incorrect();
      }
    if (localStorage.topicClear2 === 'true'){
      complete[2].correct();
      } else {
        complete[2].incorrect();

        if (typeof(Storage) !== "undefined") { 
          if (counter >= 3) {
            document.getElementById("topicClear").innerHTML ="All floors are accessible on this elevator!" ;
          } else if (localStorage.count === '1'){
            document.getElementById("topicClear").innerHTML ="Only " + localStorage.count + " floor is accessible right now." ;
          } else if (localStorage.count === '2'){
            document.getElementById("topicClear").innerHTML ="Only " + localStorage.count + " floors are accessible right now." ;
          } else if (localStorage.count === '0'){
            document.getElementById("topicClear").innerHTML ="No floors are accessible on this elevator.";
          }
      
        } else {
          document.getElementById("topicClear").innerHTML = "Sorry, your browser does not support web storage...";
        }
      }
}


const topic = new screen()
const levelPick = [new level({x:0, eqX:240, eqY:50, colour:'white'}), new level({x:1, eqX:200, eqY:50, colour:'black'}), new level({x:2, eqX:180, eqY:50, colour:'white'})]
const complete = [new floorClear(250), new floorClear(290), new floorClear(330)]

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    checkHistory()
    topic.draw()
    complete.forEach(floor => {
        floor.draw()
    })
}

function levelOne() {
    var x = document.getElementById("border1");
    var y = document.getElementById("lvl1");
    if (x.style.display === "block") {
      x.style.display = "none";
      y.style.backgroundColor = "#b3b3cb";
    } else {
      x.style.display = "block";
      y.style.backgroundColor = "#4dff4d";
      levelPick[0].draw();
    }
}

function levelTwo() {
    var x = document.getElementById("border2");
    var y = document.getElementById("lvl2");
    if (x.style.display === "block") {
      x.style.display = "none";
      y.style.backgroundColor = "#b3b3cb";
    } else {
      x.style.display = "block";
      y.style.backgroundColor = "#4dff4d";
      levelPick[1].draw();
    }
}

function levelThree() {
    var x = document.getElementById("border3");
    var y = document.getElementById("lvl3");
    if (x.style.display === "block") {
      x.style.display = "none";
      y.style.backgroundColor = "#b3b3cb";
    } else {
      x.style.display = "block";
      y.style.backgroundColor = "#4dff4d";
      levelPick[2].draw();
    }
}

var help = document.getElementById('help')
var gethelp = document.getElementById('gethelp')
var close = document.getElementsByClassName("closeEle")[0];

 gethelp.onclick = function() {  
    help.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  close.onclick = function() {
    help.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == help) {
      help.style.display = "none";
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

function checkAnswer1() {
    const choice = document.getElementById("lvl1ans3");
    let answer = document.getElementById("answerBox1").contains(choice);
    if (answer) {
      alert("The service to this floor has been restored!");
      complete[0].correct()
      counter += 1;
      localStorage.topicClear0 = 'true';
      if (choice.draggable) {
        choice.draggable = false;
      }
      document.getElementById("submit1").disabled = true;
      localStorage.count = counter.toString();
      document.getElementById('restrict1').style.display = 'none';
      document.getElementById('step2').style.display = 'flex';
      document.getElementById('ques2').style.display = 'block';
  } else {
      alert("Access to this floor is not available. Please contact an engineer.");
      complete[0].incorrect();
      localStorage.topicClear0 = 'false';
      localStorage.count = counter.toString();
      lost += 1;

  }  
  topicsCleared()
  checkLives()
}

function checkAnswer2() {
    const choice = document.getElementById("lvl2ans4");
    let answer = document.getElementById("answerBox2").contains(choice);
    if (answer) {
      document.getElementById("submit2").style.display = 'none';
      document.getElementById('ques2').style.display = 'none';
      document.getElementById('step2a').style.display = 'flex';
      document.getElementById('ques2a').style.display = 'block';
    } else if(!answer) {
        alert("Access to this floor is not available. Please contact an engineer.");
        complete[1].incorrect()
        localStorage.topicClear1 = 'false';
        localStorage.count = counter.toString();
        lost += 1;
    }  
  topicsCleared()
  checkLives()
}

function checkAnswer2a() {
  const choice = document.getElementById("lvl2aans3");
  let answer = document.getElementById("answerBox2a").contains(choice);
  if (answer) {
    document.getElementById("submit2a").style.display = 'none';
    document.getElementById('ques2a').style.display = 'none';
    document.getElementById('step2a').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step2b').style.display = 'flex';
    document.getElementById('ques2b').style.display = 'block';
  } else if(!answer) {
    alert("Access to this floor is not available. Please contact an engineer.");
    complete[1].incorrect()
    localStorage.topicClear1 = 'false';
    localStorage.count = counter.toString();
    lost += 1;
  }
  topicsCleared()
  checkLives()
}

function checkAnswer2b() {
  const choice = document.getElementById("lvl2bans3");
  let answer = document.getElementById("answerBox2b").contains(choice);
  if (answer) {
    document.getElementById("submit2b").style.display = 'none';
    document.getElementById('ques2b').style.display = 'none';
    document.getElementById('step2c').style.display= 'flex';
    document.getElementById('ques2c').style.display = 'block';
    document.getElementById("2bans").style.display = 'grid';

  } else if(!answer) {
    alert("Access to this floor is not available. Please contact an engineer.");
    complete[1].incorrect()
    localStorage.topicClear1 = 'false';
    localStorage.count = counter.toString();
    lost += 1;
  }
  topicsCleared()
  checkLives()
}

function checkAnswer2c(){
  const choice = document.getElementById("lvl2cans4");
  let answer = document.getElementById("answerBox2c").contains(choice);
  if (answer) {
    document.getElementById('ques2b').style.display = 'none';
    document.getElementById('step2c').style.display = 'flex';
    document.getElementById('ques2c').style.display = 'block';
    document.getElementById('ques2c').style.display = 'none';
    document.getElementById('2cques').style.display = 'none';
    document.getElementById('2cans').style.display = 'grid';
    alert("The service to this floor has been restored!");
    complete[1].correct()
    counter += 1;
    localStorage.topicClear1 = 'true';
    if (choice.draggable) {
      choice.draggable = false;
    }
    localStorage.count = counter.toString();
    document.getElementById('restrict2').style.display = 'none';
    document.getElementById('step3').style.display = 'flex';
    document.getElementById('ques3').style.display = 'block';
  } else if(!answer) {
    alert("Access to this floor is not available. Please contact an engineer.");
    complete[1].incorrect()
    localStorage.topicClear1 = 'false';
    localStorage.count = counter.toString();
    lost += 1;
  }
  topicsCleared()
  checkLives()
}


function checkAnswer3() {
    let correct = 0;
    var answer = false;
    var a = document.getElementById("lvl3Input1a").value;
    var b = document.getElementById("lvl3Input1b").value;
    var c = document.getElementById("lvl3Input1c").value;
    var d = document.getElementById("lvl3Input1d").value;
    var e = document.getElementById("lvl3Input2a").value;
    var f = document.getElementById("lvl3Input2b").value;
    var g = document.getElementById("lvl3Input2c").value;
    var h = document.getElementById("lvl3Input2d").value;
    var i = document.getElementById("lvl3Input3a").value;
    var j = document.getElementById("lvl3Input3b").value;
    var k = document.getElementById("lvl3Input3c").value;
    var l = document.getElementById("lvl3Input3d").value;
    const isitCorrect = [a,b,c,d,e,f,g,h,i,j,k,l];
    const itisCorrect = [1,-1,1,8,0,1,-12,-15,0,0,57,57];
  
    if (a != '' && b != '' && c != '' && d != '' && e != '' && f != '' && g != '' && h != '' && i != '' && j != '' && k != '' && l != '') {
      for (let i = 0; i < isitCorrect.length; i++) {
      if(isitCorrect[i] == itisCorrect[i]) {
        correct++
      } 
    } if (correct === 12) {
      answer = true;
    } else if (correct < 12) {
      answer = false;
    }
    } 
    if (answer) {
      document.getElementById('step3a').style.display = 'block';
      document.getElementById("submit3").style.display ='none';
      document.getElementById('submit3a').style.display = 'block';
  } else {
      alert("Access to this floor is not available. Please contact an engineer.");
      complete[2].incorrect()
      localStorage.topicClear2 = 'false';
      localStorage.count = counter.toString();
      lost += 1;
  }
  topicsCleared()
  checkLives()
}

function checkAnswer3a() {
  let correct = 0;
    var answer = false;
    var y = document.getElementById("lvl3y").value;
    var x = document.getElementById("lvl3x").value;

    const isitCorrect = [y,x];
    const itisCorrect = [-3,4];

    if (y != '' && x != '' ) {
      for (let i = 0; i < isitCorrect.length; i++) {
      if(isitCorrect[i] == itisCorrect[i]) {
        correct++
      } 
    } if (correct === 2) {
      answer = true;
    } else if (correct < 2) {
      answer = false;
    }
    } 
  if (answer) {
    alert("The service to this floor has been restored!");
    complete[2].correct()
    counter += 1;
    localStorage.topicClear2 = 'true';
    document.getElementById("submit3a").disabled = true;
    localStorage.count = counter.toString();
} else {
    alert("Access to this floor is not available. Please contact an engineer.");
    complete[2].incorrect()
    localStorage.topicClear2 = 'false';
    localStorage.count = counter.toString();
    lost += 1;
}
topicsCleared()
checkLives()
}

var life1 = document.getElementById('life1');
var life2 = document.getElementById('life2');
var life3 = document.getElementById('life3');


function checkLives() {
  if (lost === 1) {
    life1.style.cssText = 'display:inline !important';
  } else if (lost === 2) {
    life2.style.cssText = 'display:inline !important';
  } else if (lost === 3) {
    life3.style.cssText = 'display:inline !important';
    location.href = "../frontend/fail.html"
  } 
}


function topicsCleared() {
    complete.forEach(floor => {
      if (floor.clear) {
          if (localStorage.topicClear0 === 'true'){
          complete[0].correct();
          } else {
            complete[0].incorrect();
          }
          if (localStorage.topicClear1 === 'true'){
            complete[1].correct();
            } else {
              complete[1].incorrect();
            }
          if (localStorage.topicClear2 === 'true'){
            complete[2].correct();
            } else {
              complete[2].incorrect();
            }
      } 
    })
}

function homePage() {
    location.href = "../frontend/elevatorhome.html";
}

animate()