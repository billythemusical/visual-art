// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let audioContext;
let mic;
let pitch;
let song;
let frequency;
let t;
let amplitude;
let level;
let pX, pY;

function preload() {
  song = loadSound('assets/satie.mp3');
}

function setup() {
  song.play();
  amplitude = new p5.Amplitude();
  let cnv = createCanvas(windowWidth,windowHeight);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  t = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
  level = amplitude.getLevel();
  // print(level);
  // stroke(255);
  // getPitch();
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  // select('#status').html('Model Loaded');
    getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (song.isPlaying == false) {song.play();}
    if (frequency) {
        // background(100, 8);
      // let level = amplitude.getLevel();
      // print(level);
      t+=10;
      strokeWeight(4);
      // stroke(noise(t)*255, noise(t+10)*255, noise(t+5)*255);
      stroke(noise(t)*255, 100);
      // select('#result').html(frequency);

      // beginShape();
        // for (let i = 0; i < width; i++) {
        let x = map(frequency, 70, 1000, 0, width);
        // let x = map(frequency, 70, 500, 0, width * 1,5);
        let y = map(Math.log(frequency, x), 3, 8, height * 1.25, 0);
        line(x,y,pX,pY);
        // let y = map(Math.log(frequency, x), 0, 20, height, 0);
        // ellipse(x, y, 20, 20);
        // console.log(Math.log(frequency, x));
        line(0, 0, x, y + abs(level * 10));
        ellipse(x,y,10);
        pX = x;
        pY = y;
        // }
      // endShape();
      // print(map(Math.log(x, height), 0, 100, 0, height/2));
    } else {
      // select('#result').html('No pitch detected');
    }

    // if (frequency) {
    //   fill(255);
    //   let x = map(frequency, 70, 500, 0, width);
    //   let y = map(Math.log(frequency, x), 0, 20, height, 0);
    //   ellipse(x, y, 10, 10);
    //   print(map(Math.log(x, height), 0, 100, 0, height/2));
    //   }
    getPitch();
  })
}
