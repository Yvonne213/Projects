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



var song;
var song1;
var song2;
var song3;


//preload sound effect
function preload() {
  song = loadSound("8407.mp3");
  song1=loadSound("2221.mp3");
  song2=loadSound("33.mp3");
  song3=loadSound("4.mp3");
  
}

function setup() {
  createCanvas(1024, 1366);//770 790
  let rand = random(5, 15);
  let x = random(width);
  let y = random(height);
  timer = random(minTime, maxTime);
  noStroke();
  print(timer);
}

function draw() {
  background(255); // Clear the canvas

  let m = millis();
  //this is the random timer that triggers a new notification
  if (m > timer) {
    timer = timer + random(minTime, maxTime);
    createNotification();
  }

  createRect();

  //this displays the notifications
  for (let i = 0; i < notifications.length; i++) {
    notifications[i].display();
  }
}

function createNotification() {
  let a = random(0, 10);
  // this sets a random alpha transparency
  if (a < 4) {
    alpha = 255;
    song.play();
  } else {
    alpha = 0;
  }
  // this is where we are creating a new notification
  let i = round(random(0, 8)) * 2; // aligning with the grid pattern of rectangles
  let j = round(random(0, 11)) * 2; // aligning with the grid pattern of rectangles
  notifications.push(new Notification(138 + 50 * i, 132 + 50 * j, 20, alpha));
}

function mousePressed() {
  // Iterate through notifications and flag the ones to be removed
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].del(mouseX, mouseY)) {
      notifications[i].toRemove = true;
    }
  }

  // Remove notifications flagged for removal
  for (let i = notifications.length - 1; i >= 0; i--) {
    if (notifications[i].toRemove) {
      notifications.splice(i, 1);
    }
  }
}


function Notification(x, y, r, alpha) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.a = alpha;
  this.toRemove = false; // Flag to indicate whether the notification should be removed

  this.display = function () {
    fill(255, 0, 0, this.a);
    ellipse(this.x, this.y, this.r);
  };

  this.del = function (mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < this.r;
  };
}



function createRect() {
  let b = round(random(255));
  push();

  textAlign(CENTER);
    textSize(20);
    fill(0);
  text("©️Yvonne", width/2, height-30);
  fill(0);
    textSize(20);
   text("ATS", width-80, 50);
  fill(255, 0, b);
  textSize(80);
  text(' Error!  Storage is being full!' , 200, 50);


  //rect
  for (var i = 0; i < 17; i+=2) {
    for (var j = 0; j < 23; j+=2) {
      fill(0, 80);
      stroke(0);
      strokeWeight(1);
      rect(80+ 50 * i, 130 + 50 * j, 60, 60, 15);
    }
  }
  pop();
}
