// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
a music visualization using ml5 pitch detection
this ml5 Example was modified from the original examples here:
https://ml5js.org/docs/PitchDetection
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
  let cnv = createCanvas(600,600);
  background(0,0,255,40);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  t = 0;
}
//
// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

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
    let level = amplitude.getLevel();
    if (song.isPlaying == false) {song.play();}
    if (frequency) {
        // background(100, 8);
      // print(level);
      t+=10;
      strokeWeight(2);
      // stroke(noise(t)*255, noise(t+10)*255, noise(t+5)*255);
      stroke(noise(t)*255, 100);
      // select('#result').html(frequency);

      // beginShape();
        // for (let i = 0; i < width; i++) {
        let x = limit(map(frequency, 20, 1000, 20, 600), 600);
        // let x = map(frequency, 70, 500, 0, width * 1,5);
        let y = map(Math.log(frequency, x), 3, 7.7, 600 * 1.25, 0);
        line(x,y,pX,pY);
        // let y = map(Math.log(frequency, x), 0, 20, height, 0);
        // ellipse(x, y, 20, 20);
        // console.log(Math.log(frequency, x));
        line(20, 20, x, y + abs(level * 10));
        fill(255,255,0);
        ellipse(x,y,15+level*5);
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
