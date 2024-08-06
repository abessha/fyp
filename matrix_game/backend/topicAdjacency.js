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
    constructor({x,eqX,eqY}) {
        this.position = {
            x,
            eqX,
            eqY
        }
        
        this.eqH = 18
        this.eqW = 40
    }

    draw() {
        const lvl  = levelDiv[this.position.x].getContext('2d')
        lvl.beginPath();
        lvl.strokeStyle = 'white';
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
const levelPick = [new level({x:0, eqX:240, eqY:50}), new level({x:1, eqX:240, eqY:50}), new level({x:2, eqX:240, eqY:50})]
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
    const choice = document.getElementById("lvl1ans1");
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
    const choice = document.getElementById("lvl2ans3");
    let answer = document.getElementById("answerBox2").contains(choice);
    let correct = 0;
    let answer2 = false;
    var a = document.getElementById('lvl2ans3a').value;
    var b = document.getElementById('lvl2ans3b').value;
    var c = document.getElementById('lvl2ans3c').value;
    var d = document.getElementById('lvl2ans3d').value;
    var e = document.getElementById('lvl2ans3e').value;
    var f = document.getElementById('lvl2ans3f').value;
    var g = document.getElementById('lvl2ans3g').value;
    var h = document.getElementById('lvl2ans3h').value;
    const isitCorrect = [a,b,c,d,e,f,g,h]
    const itisCorrect = [4,0,3,0,0,0,2,0]
    if (a != '' && b != '' && c != '' && d != '' && e != '' && f != '' && g != '' && h != '') {
      for (let i = 0; i < isitCorrect.length; i++) {
      if(isitCorrect[i] == itisCorrect[i]) {
        correct++
      } 
    } if (correct === 8) {
      answer2 = true;
    } else if (correct < 8) {
      answer2 = false;
    }
    } 

    if (answer && answer2) {
    alert("The service to this floor has been restored!");
    complete[1].correct()
    counter += 1;
    localStorage.topicClear1 = 'true';
    if (choice.draggable) {
      choice.draggable = false;
    }
    document.getElementById("submit2").disabled = true;
    localStorage.count = counter.toString();
  } else if (answer) {
    alert("The correct matrix is used but you have completed it with the wrong values, try again.");
    complete[1].incorrect()
      localStorage.topicClear1 = 'false';
      localStorage.count = counter.toString();
      lost += 1;
  } else if (answer2) {
    alert("The correct values have been used but you have completed it in the wrong matrix, try again.");
    complete[1].incorrect()
      localStorage.topicClear1 = 'false';
      localStorage.count = counter.toString();
      lost += 1;
  } else {
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
    const choice = document.getElementById("lvl3ans2");
    let answer = document.getElementById("answerBox3").contains(choice);
    let correct = 0;
    let answer2 = false;
    var a = document.getElementById('lvl3ans2a').value;
    var b = document.getElementById('lvl3ans2b').value;
    var c = document.getElementById('lvl3ans2c').value;
    var d = document.getElementById('lvl3ans2d').value;
    var e = document.getElementById('lvl3ans2e').value;
    var f = document.getElementById('lvl3ans2f').value;
    var g = document.getElementById('lvl3ans2g').value;
    var h = document.getElementById('lvl3ans2h').value;
    var i = document.getElementById('lvl3ans2i').value;
    var j = document.getElementById('lvl3ans2j').value;
    var k = document.getElementById('lvl3ans2k').value;
    var l = document.getElementById('lvl3ans2l').value;
    var m = document.getElementById('lvl3ans2m').value;
    var n = document.getElementById('lvl3ans2n').value;
    var o = document.getElementById('lvl3ans2o').value;
    var p = document.getElementById('lvl3ans2p').value;
    var q = document.getElementById('lvl3ans2q').value;
    var r = document.getElementById('lvl3ans2r').value;
    var s = document.getElementById('lvl3ans2s').value;
    var t = document.getElementById('lvl3ans2t').value;
    var u = document.getElementById('lvl3ans2u').value;
    var v = document.getElementById('lvl3ans2v').value;
    var w = document.getElementById('lvl3ans2w').value;
    var x = document.getElementById('lvl3ans2x').value;
    var y = document.getElementById('lvl3ans2y').value;
    const isitCorrect = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y]
    const itisCorrect = [0,4,0,0,0,0,0,3,3,0,2,0,0,0,2,0,0,0,0,0,0,5,0,2,0]
    if (a != '' && b != '' && c != '' && d != '' && e != '' && f != '' && g != '' && h != '' && i != '' && j != '' && k != '' && l != '' && m != '' && n != '' && o != '' && p != '' && q != '' && r != '' && s != '' && t != '' && u != '' && v != '' && w != '' && x != '' && y != '') {
      for (let i = 0; i < isitCorrect.length; i++) {
      if(isitCorrect[i] == itisCorrect[i]) {
        correct++
      } 
    } if (correct === 25) {
      answer2 = true;
    } else if (correct < 25) {
      answer2 = false;
    }
    }

    if (answer && answer2) {
      alert("The service to this floor has been restored!");
      complete[2].correct()
      counter += 1;
      localStorage.topicClear2 = 'true';
      if (choice.draggable) {
        choice.draggable = false;
      }
      document.getElementById("submit3").disabled = true;
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