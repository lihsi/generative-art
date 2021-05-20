/* 👇 Start writing your p5.js code here */

let permissionGranted = false;
var x;
var y;
let pattern = false;
let valueX;
let valueY;

function setup() {
  createCanvas(390, 650);
  background(0);

  x = width / 2;
  y = height;

  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        let button = createButton("Click to allow access");
        button.center();
        button.style("fontsize", "24px");
        button.mousePressed(requestAccess);
        throw error;
      })
      .then(() => {
        permissionGranted = true;
      });
  } else {
    textSize(15);
    permissionGranted = false;
    background(255);
    text('404 open on Iphone :(', 100, 100);
  }
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
  this.remove();
}

//request access for motion

function draw() {
  if (!permissionGranted) return;
}

function touchEnded() {
  valueX = mouseX % 255;
  valueY = mouseY % 255;
}

function deviceMoved() {
  if (false || (accelerationX > 100 && !pattern)) {
    saveCanvas("myCanvas", "png");
  } else if (false || (accelerationX > 3 && accelerationX < 20 && !pattern)) {
    stroke(0);
    noStroke();

    ellipse(x, y, random(20), random(20));
    rect(x + 20, y + 20, random(40), random(40));
    fill(0, 20, random(30, 255));

    //pick random colors based on touch
    
    if (valueX > 195 && valueX < 390) {
      fill(0, 20, random(30, 255));
    } else if (valueX > 120 && valueX < 200) {
      fill(255, random(255), 200);
    } else if (valueX > 60 && valueX < 120) {
      fill(100, random(255), 255);
    }
  }

  //random position for pattern
  
  y = y - 1;
  if (y <= -10) {
    y = height;
  }
  x = x + random(-50, 50);

  if (x <= 0 || x >= width) {
    x = width / 2;
  }
}
