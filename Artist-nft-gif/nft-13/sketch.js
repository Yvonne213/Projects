let x = 0;
let y = 0;
let radius = 0;
let noiseScale = 0.02;
let t = 0;

P5Capture.setDefaultOptions({
  format: "gif",
  quality: 0.92,
  disableScaling: true,
  autoSaveDuration: 30,
})

function setup() {
  createCanvas(1000,1000);
  background(255);

  textAlign(CENTER, CENTER);
  push();
  textSize(45);
  text('The person who knows their', width / 2, height / 2.5 + 50);
  text('strengths at all times is an artist.', width / 2, height / 2.1 + 50);
  textSize(20);
  textStyle(ITALIC);
  text('--Artist Manifesto', width / 2, height / 1.8 + 50);
  fill(0, 0, 0);
  pop();
   push();
  textSize(25);
  fill(255, 0, 0, 150)
  text('Welcome to the circle!', width / 2, 920);
  pop();

}

function draw() {
    if (frameCount === 1) {
    const capture = P5Capture.getInstance();
    capture.start({
      format: "gif",
      duration: 600,
    });
  }
  // Add some noise to the circle's radius and position
  let noiseVal = noise(t);
  radius = map(noiseVal, 0, 1, 10, 900);
  x = width/2 + map(noise(t+10), 0, 1, -50, 50);
  y = height/2 + map(noise(t+20), 0, 1, -50, 50);
  
  // Draw the circle
  noFill();
  stroke(255,0,0,10);
  strokeWeight(2);
  ellipse(x, y, radius, radius);
  
  // Increment the time variable
  t += noiseScale;
  
    
}