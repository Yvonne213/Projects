// The actual helpful link: https://www.npmjs.com/package/@tensorflow-models/face-landmarks-detection

// let faces;
// // let detector;
let model;
let faces;

const w = 640;
const h = 480;

//falling
let threshold = 30; // lower threshold means letters will only stop on very dark spots
const fallRate = 2; // higher == faster letters
let fallingLetters = [];
//sound
var song;

function preload() {
  song = loadSound("aaayyy.mp4");

}
function setup() {
  //fullscreen step1
  createCanvas(innerWidth, innerHeight);


  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  loadFaceModel();

  //falling
  const size = 20;
  textSize(size);
  

  //let sourceText = "?><!@#$%^&*()-+~</)(^&^$%#@@!~`/,';][{}|/]'`)";
  let sourceText = [
    " ", " ", ":-0", " ",
    "Open", " ", " ",
    "Your ", " ", " ", " ",
    "Month", " ", " ", " ",
    "Or", " ", " ", " ",
    "Smile", " ", " ",
    ":)", " ", " or", "get", " ", "close",
    "to", "me", " ", " ",
  ]

  for (let i = 0; i < sourceText.length; i++) {
    let currentLetter = new FallingLetter(sourceText[i], i * size, 0);
    fallingLetters.push(currentLetter);

  }
  // colorMode(HSB, 255);
}

//sound
//song.play

function draw() {
  background(200);

  //fullscreen step2
  push();
  scale(setScale(), setScale());
  translate(w, 0);
  scale(-1, 1);
  image(capture, 0, 0);
  pop();

 





  if (capture.loadedmetadata && model !== undefined) {
    getFaces();
  }

  // push();
  // translate(w, 0);
  // scale(-1, 1);
  // image(capture, 0, 0);
  // pop();

  noStroke();

  // where the magic happens
  if (faces !== undefined) {
    // console.log(faces);
    // noLoop();
    for (const f of faces) {
      let h = 0;
      let landmarkIndex = 0;
      // textSize(5);

      // add on to the f. to loop through all the points in the
      //jaw
      const Jaw = [94, 141, 242, 20, 79, 218, 115, 131, 217, 126, 142, 36, 205, 207, 214, 170, 176, 148, 152, 377, 400, 395, 434, 427, 425, 266, 371, 355, 437, 360, 344, 438, 309, 250, 462, 370];
      //jawinside
      const jawInside = [12, 72, 73, 74, 61, 43, 204, 32, 171, 152, 396, 262, 424, 273, 291, 304, 303, 302];
      //lips
      const Lips = [61, 95, 88, 178, 87, 14, 317, 402, 318, 324, 291, 375, 321, 405, 16, 181, 91, 146];
      //month
      const month = [61, 191, 80, 81, 82, 13, 312, 311, 310, 415, 291, 324, 318, 402, 317, 14, 87, 178, 88, 95, 61];
      //left-red
      const leftForehead = [10, 417, 465, 413, 441, 295, 334, 333, 332, 297, 338,];
      const Face = [168, 412, 343, 277, 348, 347, 346, 340, 372, 368, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 395, 434, 427, 425, 266, 371, 355, 437, 420, 360, 344, 438, 309, 250, 462, 370, 94, 141, 242, 20, 79, 218, 115, 131, 217, 126, 142, 36, 205, 207, 214, 170, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 139, 143, 111, 117, 118, 119, 47, 114];
      const leftBeard = [429, 423, 426, 410, 393, 326, 327, 331];
      //left black
      const leftEyeBlack = [332, 284, 251, 389, 368, 372, 340, 346, 347, 348, 277, 343, 465, 413, 441, 295, 334, 333];
      const ForeHeadline = [151, 193, 245, 114, 168, 412, 343, 465, 417];

      //lefteye White
      const leftEye = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382];
      const leftEyeBrow = [295, 443, 283, 301, 251, 389, 276, 444, 257, 258, 442];


      //rightForehead
      const rightForehead = [10, 109, 67, 103, 104, 105, 65, 221, 189, 245, 193];
      //rightBeard
      const rightBeard = [209, 102, 98, 97, 167, 186, 206, 203];
      // right-black
      const rightEyeBlack = [103, 104, 105, 65, 221, 189, 245, 114, 47, 119, 118, 117, 111, 143, 139, 162, 21, 54];
      //righteye
      const rightEye = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 145, 144, 163, 7];
      //righteyebrow
      const rightEyeBrow = [21, 71, 53, 223, 65, 222, 28, 27, 224, 46, 162];


      const tlp = createVector(f.scaledMesh[14][0], f.scaledMesh[14][1])
      const dlp = createVector(f.scaledMesh[15][0], f.scaledMesh[15][1])
      const llp = createVector(f.scaledMesh[62][0], f.scaledMesh[62][1])
      const rlp = createVector(f.scaledMesh[292][0], f.scaledMesh[292][1])
      //diatance
  
      // console.log(tlp[0],tlp[1])
      let d = dist(tlp.x,tlp.y,dlp.x,dlp.y);
      let d2 = dist(llp.x, llp.y, rlp.x, rlp.y);
      console.log(d2); //test

      //song play
      if (d > 8) {
        song.play();
      }
      if (d < 8) {
        song.stop();
      }

      push()
      scale(setScale(), setScale())
      // add mirror code
      const stepSize = 20;
      capture.loadPixels()
      for(let y=0;y<capture.height; y+=stepSize){
        for(let x=0;x<capture.width;x+=stepSize){
          const i= (x+y*capture.width)*4
          const r = capture.pixels[i];
          const g =  capture.pixels[i+1];
           const b = capture.pixels[i+2];
         const brightness = (r+g+b)/3

         fill(r,g,b);
         stroke(0);
         strokeWeight(2);
      
         push();
    
         translate(w, 0);
         scale(-1, 1);
         rect(x, y, stepSize, stepSize);
      pop();
         
          // do the mirror stuff
        }
      }
      capture.updatePixels();
      //jaw
      push();
      beginShape();
      for (let i = 0; i < Jaw.length; i++) {
        const jaw = f.scaledMesh[Jaw[i]];
        fill(0);
        strokeWeight(3);
        stroke(255);
        curveVertex(jaw[0], jaw[1]);
      }
      endShape(CLOSE);
      pop();

      //leftForehead
      beginShape();
      for (let i = 0; i < leftForehead.length; i++) {
        const fh = f.scaledMesh[leftForehead[i]];
        fill(255, 0, 0);
        //  strokeWeight(4);
        //  stroke(255);
        curveVertex(fh[0], fh[1]);
        const c1 = map(d, 1, 8, 0, 255)
        const c2 = map(d, 1, 8, 255, 0)
        const rate = 30
        const c3 = map(sin(frameCount / rate), -1, 1, 0, 255)
        const c4 = map(cos(frameCount / rate), -1, 1, 0, 255)

        if (d < 8 && d > 1) {
          fill(c4, c2, c3)
        }
        if (d2 > 75) {
          fill(0, random(255), 0);
        }
      }
      endShape(CLOSE);
      //Red Face
      beginShape();
      for (let i = 0; i < Face.length; i++) {
        const rf = f.scaledMesh[Face[i]];
        fill(255, 0, 0);
        curveVertex(rf[0], rf[1]);

        const c1 = map(d, 1, 8, 0, 255)
        const c2 = map(d, 1, 8, 255, 0)
        const rate = 30
        const c3 = map(sin(frameCount / rate), -1, 1, 0, 255)
        const c4 = map(cos(frameCount / rate), -1, 1, 0, 255)

        if (d < 8 && d > 1) {
          fill(c2, c1, c1)
        }
        if (d2 > 75) {
          fill(0, random(255), 0);
        }

      }
      endShape(CLOSE);

      //leftBeard
      push();
      beginShape();
      for (let i = 0; i < leftBeard.length; i++) {
        const lb = f.scaledMesh[leftBeard[i]];
        strokeWeight(3);
        stroke(255);
        fill(255, 0, 0);
        const c1 = map(d, 1, 8, 0, 255)
        const c2 = map(d, 1, 8, 255, 0)

        if (d < 8 && d > 1) {
          // stroke(c2, c2, c1)
          // fill(c1, 0, c1);
          stroke(c1, c1, c2)
          fill(c1, 0, c1);
        }
        if (d2 > 75) {
          fill(random(255), random(255), random(255));
        }

        curveVertex(lb[0], lb[1]);
      }
      endShape(CLOSE);
      pop();

      //left eye Black
      push();
      beginShape();
      for (let i = 0; i < leftEyeBlack.length; i++) {
        const leb = f.scaledMesh[leftEyeBlack[i]];
        fill(0);
        strokeWeight(3);
        stroke(255);
        curveVertex(leb[0], leb[1]);
      }
      endShape(CLOSE);
      pop();

      //leftEye
      beginShape();
      for (let i = 0; i < leftEye.length; i++) {
        const lm = f.scaledMesh[leftEye[i]];
        fill(255);
        if (d2 > 75) {
          fill(0, random(255), 0);
        }
        curveVertex(lm[0], lm[1]);
      }
      endShape(CLOSE);

      //ForeHeadline
      push();
      beginShape();
      for (let i = 0; i < ForeHeadline.length; i++) {
        const fhl = f.scaledMesh[ForeHeadline[i]];
        fill(0);
        strokeWeight(2);
        stroke(255);
        curveVertex(fhl[0], fhl[1]);
      }
      endShape(CLOSE);
      pop();

      //lefteyebrow
      push();
      beginShape();
      for (let i = 0; i < leftEyeBrow.length; i++) {
        const leb = f.scaledMesh[leftEyeBrow[i]];
        fill(245, 210, 245);
        strokeWeight(2);
        stroke(255);
        curveVertex(leb[0], leb[1]);
      }
      endShape(CLOSE);
      pop();



      //rightForehead
      beginShape();
      for (let i = 0; i < rightForehead.length; i++) {
        const rf = f.scaledMesh[rightForehead[i]];
        fill(255, 0, 0);
        curveVertex(rf[0], rf[1]);
        const c1 = map(d, 1, 8, 0, 255)
        const c2 = map(d, 1, 8, 255, 0)
        const rate = 30
        const c3 = map(sin(frameCount / rate), -1, 1, 0, 255)
        const c4 = map(cos(frameCount / rate), -1, 1, 0, 255)

        if (d < 8 && d > 1) {
          fill(c4, c2, c3)
        }
        if (d2 > 75) {
          fill(0, random(255), 0);
        }
      }
      endShape(CLOSE);

      //rightBeard
      push();
      beginShape();
      for (let i = 0; i < rightBeard.length; i++) {
        const rb = f.scaledMesh[rightBeard[i]];
        fill(255, 0, 0);
        strokeWeight(3);
        stroke(255);
        curveVertex(rb[0], rb[1]);
        const c1 = map(d, 1, 8, 0, 255)
        const c2 = map(d, 1, 8, 255, 0)

        if (d < 8 && d > 1) {
          stroke(c1, c1, c2)
          fill(c1, 0, c1);
        }
        if (d2 > 75) {
          fill(random(255), random(255), random(255));
        }
      }
      endShape(CLOSE);
      pop();

      //rightEyeBlack
      push();
      beginShape();
      for (let i = 0; i < rightEyeBlack.length; i++) {
        const reb = f.scaledMesh[rightEyeBlack[i]];
        fill(0);
        strokeWeight(3);
        stroke(255);
        curveVertex(reb[0], reb[1]);
      }
      endShape(CLOSE);
      pop();

      //rightEye
      beginShape();
      for (let i = 0; i < rightEye.length; i++) {
        const re = f.scaledMesh[rightEye[i]];
        fill(255);
        curveVertex(re[0], re[1]);
        if (d2 > 75) {
          fill(0, random(255), 0);
        }
      }
      endShape(CLOSE);
      // jawinside
      beginShape();
      for (let i = 0; i < jawInside.length; i++) {
        const ji = f.scaledMesh[jawInside[i]];
        fill(252, 230, 201);
        curveVertex(ji[0], ji[1]);
      }
      endShape(CLOSE);
      // lips
      beginShape();
      for (let i = 0; i < Lips.length; i++) {
        const li = f.scaledMesh[Lips[i]];
        fill(255, 0, 0);
        curveVertex(li[0], li[1]);
      }
      endShape(CLOSE);
      // month
      beginShape();
      for (let i = 0; i < month.length; i++) {
        const mon = f.scaledMesh[month[i]];
        fill(255);
        curveVertex(mon[0], mon[1]);
      }
      endShape(CLOSE);
      //righteyebrow
      push();
      beginShape();
      for (let i = 0; i < rightEyeBrow.length; i++) {
        const reb = f.scaledMesh[rightEyeBrow[i]];
        fill(245, 210, 245);
        strokeWeight(2);
        stroke(255);
        curveVertex(reb[0], reb[1]);
      }
      endShape(CLOSE);
      pop();


      // 测距

      // face silhouette
      //           beginShape()
      //             for(const lm of f.annotations.silhouette) {

      //               vertex(lm[0],lm[1])
      //                    // const hue = map(h, 0, f.scaledMesh.length, 0, 255);
      //                   //  fill(hue, 255, 255);
      //                   //  text(landmarkIndex, lm[0], lm[1])
      //                     //ellipse(lm[0], lm[1], 2, 2);
      //                    // h++;
      //                  //   landmarkIndex++;
      //             }
      //           endShape(CLOSE)






    }

    //     let f = faces;
    //    //console.log(f);

    // let tlp = f.scaledMesh[14]
    // let dlp = f.scaledMesh[15]
    // // console.log(tlp, dlp);

    //         let tlps=(tlp[0],tlp[1])
    //         let dlps=(tlp[0],tlp[1])


  }

  //falling
  capture.loadPixels();
  if (capture.pixels.length > 0) {

    // loop through all the fallingLetters
    for (let i = 0; i < fallingLetters.length; i++) {

      // while the current fallingLetter is greater than 0 AND the brightness of the current pixel where the letter is falling is less than our threshold (which means the letter has encountered a dark pixel), then continue to raise the letter up.
      while (fallingLetters[i].y > 0 && getBrightness(capture.pixels, i) < threshold) {
        fallingLetters[i].y--;
      }

      // if the letter reaches the bottom of the screen, loop back around to the top and keep falling
      if (fallingLetters[i].y >= h) {
        fallingLetters[i].y = 0;
      }

      // else, the fallingLetter keeps falling
      else {
        fallingLetters[i].y += fallRate;
      }
    }
  }

  for (let l of fallingLetters) {
    fill((random(0, 255)), 0, 0);
    text(l.char, l.x, l.y - 2);
  }
  pop()
}

//falling
class FallingLetter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
}
//falling
function getBrightness(capturePixels, currentLetter) {

  // store the current falling letter
  const fl = fallingLetters[currentLetter];

  // calculate the index of the pixel where the letter is (note the "w-fl.x", which accounts for the mirrored webcam image)
  const index = ((w - fl.x) + fl.y * width) * 4
  let r = capturePixels[index + 0];
  let g = capturePixels[index + 1];
  let b = capturePixels[index + 2];

  return (r + g + b) / 3;
}

function drawSilhouette(f) {
  beginShape();
  for (const kp of f.annotations.silhouette) {
    const keyPoint = createVector(kp[0], kp[1]);
    vertex(keyPoint.x, keyPoint.y);
  }
  endShape(CLOSE);
}

function drawEyes(f) {
  textSize(4);
  noStroke();
  for (const kp of f.annotations.leftEyeLower0) {
    fill(0, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("l0", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeLower1) {
    fill(37, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("l1", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeLower2) {
    fill(74, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("l2", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeLower3) {
    fill(111, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("l3", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeUpper0) {
    fill(148, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("u0", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeUpper1) {
    fill(185, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("u1", kp[0], kp[1]);
  }

  for (const kp of f.annotations.leftEyeUpper2) {
    fill(222, 259, 259);
    // ellipse(kp[0], kp[1], 2, 2);
    text("u2", kp[0], kp[1]);
  }
}

async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );

  console.log(model);
}

async function getFaces() {
  const predictions = await model.estimateFaces({
    input: document.querySelector("video"),
    returnTensors: false,
    flipHorizontal: true,
    predictIrises: false, // set to 'false' if sketch is running too slowly
  });

  if (predictions.length === 0) {
    faces = undefined;
  } else {
    faces = predictions;
  }
}

//fullscreen step3
function windowResized() {
  createCanvas(innerWidth, innerHeight)
}

//fullscreen step4
function setScale() {
  if (innerWidth / w >= innerHeight / h) { return innerWidth / w; }
  else { return innerHeight / h; }
}
