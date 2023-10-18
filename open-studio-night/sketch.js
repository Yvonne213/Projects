let notifications = [];
let timer;
//minimum time limit
let minTime = 200;
//maximum time limit
let maxTime = 500;
let notify = true;
let alpha = 0;
let xOffset = 0.0;
let yOffset = 1000.0;

var song;

//preload sound effect
function preload() {
  song = loadSound("8407.mp3");
}

function setup() {
  createCanvas(770, 790); //770 790
  let rand = random(5, 15);
  let x = random(width);
  let y = random(height);
  yOffset = height*0.8;
  timer = random(minTime, maxTime);
  noStroke();
  print(timer);
}


function draw() {
  // background(255); // Clear the canvas

  // Set background with a flowing water effect using Perlin noise
  //255,r,100
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      let r = noise(x * 0.01 , y * 0.01 + width) * 255;
      pixels[index] = 255; // Red channel
      pixels[index + 1] = r; //Green channel
      pixels[index + 2] = 100; //Blue
      pixels[index + 3] = 180; // Alpha channel (fully opaque)
    }
  }
  updatePixels();

  // Update Perlin noise offsets to create a flowing effect
  xOffset += 0.01;
  yOffset += 0.01;

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
      if (random(1) > 0.5) {
        createRandomAlert();
      }
    }
  }
}

function createRandomAlert() {
  let alerts = [
    "New updates available! Tap to see what's new in version 2.0.",
    "天猫：双十一，百万大奖等你拿！",
    "Only spend 1 dollar, get iphone15!",
    "おっとー勉強の時間だ、ちっちと始めよう！",
    "Sender:Yuwen\nMessage Preview:\nHi there!\nTake your time, enjoy the notifications!",
    "Event: Open Studio Night.\nTime: Oct 21-22\nLocation: Sullivan Building 1415",
    "Reminder Text: Yuwen's studio is in Lakeview 1116.\nCheck it out!",
    "Greetings from Yvonne:\nIsn't it annoying?",
    "Sender:yhuang45@saic.edu\nSubject Line:Welcome to RED. exhibition",
    "Breaking News: Earthquake reported in neighboring city. Follow for updates.",
    "Reminder: Artist Statement and Bio due tomorrow.",
    "Today's Forecast: Sunny with a high of 75°F. Perfect day to spend outdoors!",
    // Add more unique alerts as needed
  ];

  let randomAlert = random(alerts);
  alert(randomAlert);
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
  fill(190, 100, 100);
  text("©️Yvonne2023 @hywener", width / 2, height - 30);

  fill(0, 80);
  textSize(20);
  text("///////AT/SP", width - 80, 50);
  fill(255,b,b);
  textSize(75);
  text("Storage Almost full!", 360, 80);

  // words colum
  let s = 20;
  let p = 50;
  let rr=120
  const scream = "WIPE OUT RED DOTS";
  textSize(65);
  textWrap(WORD);
  // text(scream, -120 - s, 60 - p, 1000);
  // fill(0, 0, 0, 75);
  // text(scream, -80-s, 100-p,1000)
  // fill(0, 0, 0, 60);
  // text(scream, -40-s, 150-p, 1000);
  // fill(0, 0, 0, 55);
  // text(scream, 0-s, 200-p, 1000);

  fill(rr, 0, 0, 65);
  text(scream, 40 - s, 250 - p, 1000);
  fill(rr, 0, 0, 45);
  text(scream, 80 - s, 300 - p, 1000);
  fill(rr, 0, 0, 40);
  text(scream, 120 - s, 350 - p, 1000);
  fill(rr, 0, 0, 35);
  text(scream, 160 - s, 400 - p, 1000);
  fill(rr, 0, 0, 30);
  text(scream, 200 - s, 450 - p, 1000);
  fill(rr, 0, 0, 25);
  text(scream, 240 - s, 500 - p, 1000);
  fill(rr, 0, 0, 20);
  text(scream, 280 - s, 550 - p, 1000);
  fill(rr, 0, 0, 15);
  text(scream, 320 - s, 600 - p, 1000);
  fill(rr, 0, 0, 10);
  text(scream, 360 - s, 650 - p, 1000);

  //rect
  for (var i = 0; i < 17; i += 2) {
    for (var j = 0; j < 23; j += 2) {
      fill(255, 150);
      noStroke();
      strokeWeight(1);
      rect(80 + 50 * i, 130 + 50 * j, 60, 60, 15);
    }
  }
  pop();
}
