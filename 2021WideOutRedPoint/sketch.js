let notifications = [];
let timer;
//minimum time limit
let minTime = 200;
//maximum time limit
let maxTime = 500;
let notify = true;
let w = 0;
let y = 0;
let alpha = 0;
//let extraCanvas;
var r;
var b;
var g;
let R;
let B;
var song;
var song1;
var song2;
var song3;



function preload() {
  song = loadSound("8407.mp3");
  song1=loadSound("2221.mp3");
  song2=loadSound("33.mp3");
  song3=loadSound("4.mp3");
  
}

function setup() {
alert(
 "NOTIFICATION CENTER                                                                        Hey！You've got a message.");
alert("Sorry, not 'a'message but 'several' messages are waiting you.");
alert("Oh!  It's going to crash now!  Check it quickly!");
alert("Please mute your phone if you find it annoying!");

  createCanvas(770, 790);
  let rand = random(5, 15);
  let x = random(width);
  let y = random(height);
  timer = random(minTime, maxTime);
  noStroke();
  print(timer);
  //extraCanvas= createGraphics(800,800);
  //extraCanvas.background(255,255,255);
  // extraCanvas.clear;
 
}

function draw() {
  // R=random(255);
  // B=random(255);
  r = map(mouseX, 0, 770, 0, 255);
  b = map(mouseY, 0, 800, 255, 0);
  g = map(mouseX, 50, 400, 5, 80);

  background(r, g, b, 80);

  createRect();

  let m = millis();

  //this is the random timer that triggers a new notification
  if (m > timer) {
    timer = timer + random(minTime, maxTime);
    createNotification();
  }

  //this displays the notifications
  for (let i = 0; i < notifications.length; i++) {
    notifications[i].display();
  }
}

function createNotification() {
  let a = random(0, 10);
  //this sets a random alpha trasparency
  if (a < 4) {
    alpha = 255;
    song.play();
  } else {
    alpha = 0;
  }
  //this is where we are creating a new notification

  let i = round(random(0, 16));
  notifications.push(new Notification(50 + w, 50 + y, 15, alpha));
  if (50 + w < width) {
    w = w + 50;
  } else {
    w = 0;
    // y = y + 50
  }
  if (50 + y < height) {
    y = y + 50 * i;
  } else {
    y = 0;
  }
}

function mousePressed() {
  // let a=200;
  //let b=200;
  let w = random(0, 197.5);
  let w1 = random(197.5, 394);
  let w2 = random(394, 591.5);
  let w3 = random(591.5, 790);


  //this is how we delete a notification when we click on it
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].del(mouseX, mouseY)) {
      notifications.splice(i, 1);
    }
  }

  if (mouseX < 95 && mouseX > 0 && mouseY < 800 && mouseY > 730) {
    if (mouseIsPressed) {
      song1.play();
      alert("Messege from Yvonne : Now You've found me! Thank you for your participation and let us have a break now.");
      
    }
  }
  
  if (mouseX < w3 && mouseX > w2 && mouseY < w3 && mouseY > w2) {
    if (mouseIsPressed) {
    
     song2.play();
      alert("Sorry, it's not here!  Please check again!");
  
    }
  }
  
  if (mouseX > w && mouseX < w1 && mouseY > w2 && mouseY < w3) {
    if (mouseIsPressed) {
      song3.play();
      alert("おっとー勉強の時間だ、ちっちと始めよう！");
    }
  }
  
    if (mouseX > w1 && mouseX < w2 && mouseY > w1 && mouseY < w2) {
      if (mouseIsPressed) {
        alert("天猫：双十一，百万大奖等你拿！");
      }
    }
  
    if (mouseX < w && mouseY > w && mouseY < w1) {
      if (mouseIsPressed) {
  alert("Only spend 1 dollar，and you can get iphone13!");
      }
    }
  
    if (mouseX > w2 && mouseX < w3 && mouseY > w && mouseY < w1) {
      if (mouseIsPressed) {
        alert("lol, You can't find me!");
      }
    }
  
      if (mouseX > w && mouseX < w1 && mouseY < w) {
        if (mouseIsPressed) {
          alert("Notice! You do have a real message.");
        }
      }
  
      if (mouseX < w && mouseY < w) {
        if (mouseIsPressed) {
          alert("Sorry! Just some advertisetments.");
        }
      }
  
}

function Notification(x, y, r, alpha) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.a = alpha;

  this.display = function () {
    fill(255, 0, 0, this.a);
    ellipse(this.x, this.y, this.r);
  };

  this.del = function (mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  };
}

function createRect() {
  let b = round(random(255));

  push();

  // image(extraCanvas,0,0);
  // extraCanvas.fill(0,150);
  // extraCanvas.strokeWeight(4);
  // extraCanvas.rect(20,50,30,30,4);
  
    textSize(10);
    fill(0);
  text("©️Yvonne", 710, 40);
  
  fill(0);
    textSize(15);
   text("ATS", 720, 30);
  fill(255, 0, b);
  textSize(15);
  text(' Error!  Storage is being full!' , 18, 30);

  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      fill(0, 80);
      stroke(0);
      strokeWeight(1);
      rect(20 + 50 * i, 48 + 50 * j, 30, 30, 9);
    }
  }

  pop();
}
