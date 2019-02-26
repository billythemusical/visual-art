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
  pitch = ml5.pitchDetection('model/', audioContext , mic.stream, modelLoaded);
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
      t+=10;
      strokeWeight(2);
      // stroke(noise(t)*255, noise(t+10)*255, noise(t+5)*255);
      stroke(noise(t)*255, 100);
      let x = limit(map(frequency, 20, 1000, 20, 600), 600);
      // let x = map(frequency, 70, 500, 0, width * 1,5);
      let y = map(Math.log(frequency, x), 3, 7.7, 600 * 1.25, 0);
      // let y = map(Math.log(frequency, x), 0, 20, height, 0);
      line(x,y,pX,pY);
      line(20, 20, x, y + abs(level * 10));
      fill(255,255,0);
      ellipse(x,y,15+level*5);
      pX = x;
      pY = y;
    }
    getPitch();
  })
}
