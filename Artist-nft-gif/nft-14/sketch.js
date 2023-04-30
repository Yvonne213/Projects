let circles = [];


P5Capture.setDefaultOptions({
  format: "gif",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})


function setup() {
  createCanvas(1000, 1000);
  background(255);
  for(let i = 0; i < 10; i++) {
    let circle = {
      x: width/2,
      y: height/2,
      radius: 0,
      noiseScale: random(0.01, 0.02),
      t: random(100),
      color: color(random(200,255),0,0,random(0,100))
    };
    circles.push(circle);
  }
}

function draw() {
  if (frameCount === 1) {
    const capture = P5Capture.getInstance();
    capture.start({
      format: "gif",
      duration: 600,
    });
  }
  
  background(255);
  for(let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    // Add some noise to the circle's radius and position
    push();
    let noiseVal = noise(circle.t);
    circle.radius = map(noiseVal, 0, 1, 50, 800)
    circle.x = width/2 + map(noise(circle.t+10), 0, 1, -100,100)
    circle.y = height/2 + map(noise(circle.t+20), 0, 1, -100,100);
    
    // Draw the circle
    noFill();
    stroke(circle.color);
    strokeWeight(2);
    ellipse(circle.x, circle.y, circle.radius, circle.radius);
    
    // Increment the time variable
    circle.t += circle.noiseScale;
    pop();
  }
  
  push();
  textSize(25);
  fill(255, 0, 0, 150)
  text('Welcome to the circle!', width / 2, 920);
  pop();

  textAlign(CENTER, CENTER);
  push();
  textSize(45);
  text('The person who has a professional', width / 2, height / 2.5 + 50);
  text('artist statement is an artist.', width / 2, height / 2.1 + 50);
  textSize(20);
  textStyle(ITALIC);
  text('--Artist Manifesto', width / 2, height / 1.8 + 50);
  fill(0, 0, 0);
  pop();
}