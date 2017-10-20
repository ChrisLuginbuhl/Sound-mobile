// Adapted from Learning Processing by Daniel Shiffman
// http://www.learningprocessing.com
// Doorbell sample by Corsica_S via freesound.org,
// Creative Commons BY 3.0
//from https://p5js.org/examples/sound-sound-effect.html
// A sound file object
var dingdong;

// A doorbell object (that will trigger the sound)
var doorbell;

var pitchMin = 1;
var pitchMax = 2000;
var pitchStep = 5;

var pitch = 500;
var instrument = ['snare', 'highHat', 'bassDrum', 'clap', 'laugh', 'cowbell', 'maracas'];
//Static var TIMEOUT = 600;
//var time = 0;
var shakeCount = 0;
var SHAKE_INTERVAL = 600; 
var lastShake = 0;

var gui;


function setup() {
  createCanvas(200, 200);

  // Load the sound file.
  // We have included both an MP3 and an OGG version.
  soundFormats('mp3', 'ogg', 'wav');
  dingdong = loadSound('assets/doorbell.mp3');
  bassDrum = loadSound('assets/bassdrum.mp3');
  maracas = loadSound('assets/maracas2.mp3');
  snare = loadSound('assets/snare.wav');





  // Create a new doorbell
  doorbell = new Doorbell(width/2, height/2, 64);

  setShakeThreshold(30);

  gui = createGui('label');
  gui.addGlobals('pitch', 'instrument');
}

function draw() {
  background(255);
  // Show the doorbell
  doorbell.display(mouseX, mouseY);

  gui.show();
}

function mousePressed() {
  // If the user clicks on the doorbell, play the sound!
  if (doorbell.contains(mouseX, mouseY)) {
    snare.play();
  }
}

function deviceShaken() {
  	if (millis() - lastShake >= SHAKE_INTERVAL) {
  		maracas.play();
  		lastShake = millis();
  	}
  //	shakeCount += 1;
  //	print(shakeCount);

  	
 }

// A Class to describe a "doorbell" (really a button)
var Doorbell = function(x_, y_, r_) {
  // Location and size
  var x = x_;
  var y = y_;
  var r = r_;

  // Is a point inside the doorbell? (used for mouse rollover, etc.)
  this.contains = function(mx, my) {
    if (dist(mx, my, x, y) < r) {
      return true;
    } else {
      return false;
    }
  };

  // Show the doorbell (hardcoded colors, could be improved)
  this.display = function(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipse(x, y, r, r);
  };

};
